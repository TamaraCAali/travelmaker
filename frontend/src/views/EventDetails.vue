<template>
  <div class="event-details">
    <div v-if="!event" class="loader">
      Loading Event...
    </div>
    <template v-else>
      <div class="event-img screen" :style="'background-image: url('+event.img+')'">
        <div class="event-header">
          <div class="flex direction-column">
            <h1>{{event.name}}</h1>
            At: {{event.loc.title}}</div>
                  <div class="btns-container">
                        <div @click="toggleEventAttendence()">
                          <template v-if="!userIsAttending" >
                            <i class="far fa-check-circle fa-2x" title="join event"></i><br/>
                          </template>
                          <template v-else>
                            <i class="far fa-times-circle fa-2x" title="leave event"></i><br/>
                          </template>
                        </div>
                        <div @click="showCopyUrlMsg">
                            <i class="far fa-copy fa-2x" v-clipboard:copy="eventUrl" title="copy event link"></i> <br/>
                        </div>
                        <i v-if="userIsAdmin"
                              @click="goEditEvent" 
                              class="edit-btn far fa-edit fa-2x" title="edit event"></i>
      </div>
             
            <div class="event-time">
              <p>
                {{event.startTime | formatDate}} <br/>
                {{event.startTime | formatHour}}
                <template v-if="onSameDay"> 
                  - {{event.endTime | formatHour}}
                </template>
              </p>
              <template v-if="!onSameDay"> 
                -
                <p>
                  {{event.endTime | formatDate}} <br/>
                  {{event.endTime | formatHour}}
                </p>
              </template>
              
            </div>
      </div>
      </div>

      <div class="container">
        <div class="flex details-container align-center">
        <div class="event-dest-container">
      <div>
        
        <div class="attends-container" @click="showAttendsList = true">
          <i class="fas fa-user-friends"></i>
          {{event.attends.length}} people attending
          <img v-for="(user, userIdx) in attendingUsers.slice(0, 3)" 
                class="attends-img" 
                :style="{ right: userIdx*5 + 'px' }"
                :src="user.img" 
                :key="user._id">
          <span>...</span>
        </div>
        <attends-list v-if="showAttendsList" 
          @close-list="showAttendsList = false"
          @selected="openSelectedUsers"
          :users="attendingUsers">
        </attends-list>
      </div>
      <p>
      {{event.desc}}
      </p>
      <div class="difficulty-lvl-container">
        <i class="fas fa-walking"></i>
        {{eventLvl}}
      </div>
            <div class="tags-container">
        Tags: 
        <el-tag v-for="tag in event.tags" :key="tag">{{tag}}</el-tag>
      </div>
      </div>
      <div v-if="event" class="map" ref="map"></div>
</div>
      <h3>Comments:</h3>
      <ul class="comments clean-list">
        <li class="comment" v-for="comment in event.comments" :key="comment.at">
          <img :src="comment.creatorImg" @click="$router.push(`/user/${comment.creatorId}`)" />
          <el-tag class="el-tag-comment" type="success">{{comment.txt}} <span>- {{comment.at | commentTime}}</span></el-tag>
        </li>
        <li>
          <input
            class="new-comment-input"
            :placeholder="newCommentPlaceholder"
            @keydown.enter="submitComment"
            v-model="newCommentTxt"
            :disabled="!user._id"
            />
        </li>
      </ul>
      </div>
    </template>
  </div>
</template>

<script>
import moment from 'moment';
import AttendsList from '../components/AttendsList';
import locService from '../services/locationService';
import eventService from '../services/eventService';
import userService from '../services/userService';

export default {
  name: 'home',
  components: {
    AttendsList
  },
  data() {
    return {
      event: {
        attends: [],
        loc: { lat: 33, lng: 35 }
      },
      user: null,
      eventAddress: '',
      eventUrl: window.location.href,
      newCommentTxt: '',
      showAttendsList: false,
      attendingUsers: []
    };
  },
  created() {
    let idFromParams = this.$route.params.eventId;
    // console.log('event id sent:', idFromParams);
    eventService.getById(idFromParams).then(res => {
      console.log('got event:', res);
      this.event = JSON.parse(JSON.stringify(res));
      console.log('this.event', this.event);
      this.initMap();
      this.getAttendingUsers();
    });
    this.user = this.$store.getters.getUser;
    // console.log('user:', this.user);
  },
  methods: {
    openSelectedUsers(user) {
      this.$router.push(`/user/${user._id}`);
    },
    toggleEventAttendence() {
      if (!this.user._id) {
        this.$message.error('Please login to join an event');
        this.$router.push('/login');
      }
      if (this.userIsAttending) {
        // console.log('leaving');
        let userIdx = this.event.attends.findIndex(id => id === this.user._id);
        this.event.attends.splice(userIdx, 1);
        eventService.update(this.event);
        let eventIdx = this.user.activity.events.findIndex(
          id => id === this.event._id
        );
        this.user.activity.events.splice(eventIdx, 1);
        userService.update(this.user);
      } else {
        // console.log('attending');
        this.event.attends.push(this.user._id);
        eventService.update(this.event);
        this.user.activity.events.push(this.event._id);
        userService.update(this.user);
      }
    },
    showCopyUrlMsg() {
      this.$message({
        message: 'URL copied',
        type: 'success'
      });
    },
    initMap() {
      // if (!this.event || !this.event.loc) return
      var map = new google.maps.Map(this.$refs.map, {
        zoom: 4,
        center: {
          lat: this.event.loc.coordinates[0],
          lng: this.event.loc.coordinates[1]
        }
      });
      var marker = new google.maps.Marker({
        position: {
          lat: this.event.loc.coordinates[0],
          lng: this.event.loc.coordinates[1]
        },
        map: map
      });
    },
    goEditEvent() {
      this.$router.push(`edit/${this.event._id}`);
    },
    submitComment() {
      let newComment = {
        creatorId: this.user._id,
        creatorName: this.user.name.first + ' ' + this.user.name.last,
        creatorImg: this.user.img,
        txt: this.newCommentTxt,
        at: Date.now()
      };
      this.event.comments.push(newComment);

      this.sendNotification(newComment);

      eventService.update(this.event);
      console.log('saving comment:', newComment);
      this.newCommentTxt = '';
    },
    getAttendingUsers() {
      userService
        .getByIds(this.event.attends)
        .then(res => {
          this.attendingUsers = res.data;
        })
        .catch(err => {
          console.log('Err:', err);
        });
    },
    clearSelfNtfsMap() {
      if (this.user.cmntNtfsMap[this.$route.params.eventId]) {
        delete this.user.cmntNtfsMap[this.$route.params.eventId];
        this.$store.dispatch({ type: UPDATE_USER, user: this.user });
      }
    },
    sendNotification(cmnt) {
      let otherUsersUpdated = this.attendingUsers.map(user => {
        if (user._id !== cmnt.creatorId) {
          if (!user.cmntNtfsMap[this.$route.params.eventId]) {
            user.cmntNtfsMap[this.$route.params.eventId] = [];
          }
          user.cmntNtfsMap[this.$route.params.eventId].push(cmnt);
          // userService.updateOtherUser(user);

          let pushNtf = {
            ntfRoom: 'ntf-' + user._id,
            title: 'TravelMaker',
            options: {
              body: 'You have a new message from ' + cmnt.creatorName,
              icon:
                'data:image/png;base64,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',
              vibrate: [100, 50, 100],
              data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
              }
            }
          };
          this.$socket.emit('assignPushNtf', pushNtf);
        }
        return user;
      });
      // optional userService.updateByIds(otherUsersUpdated)
    }
  },
  sockets: {},
  computed: {
    eventLvl() {
      if (this.event.level === 0) {
        return 'Easy';
      }
      if (this.event.level === 1) {
        return 'Light walking';
      }
      if (this.event.level === 2) {
        return 'Moderate trek';
      }
      if (this.event.level === 3) {
        return 'Advanced trek';
      }
      if (this.event.level === 4) {
        return 'Difficult trek';
      }
    },
    userIsAttending() {
      if (this.user && this.user._id)
        return this.event.attends.includes(this.user._id);
      else return false;
    },
    userIsAdmin() {
      return true;
      // return this.event.creatorId === this.user._id
    },
    onSameDay() {
      return (
        moment(+this.event.startTime).startOf('day')['_d'] + '' ==
        moment(+this.event.endTime).startOf('day')['_d'] + ''
      );
    },
    newCommentPlaceholder() {
      if (this.user._id) return 'Add a comment';
      else return 'Please log in to add a comment';
    }
  },
  watch: {
    event() {
      this.initMap();
      // console.log('is user attending?', this.userIsAttending);
    }
  },
  filters: {
    formatDate(val) {
      return moment(val).format('MMM Do');
    },
    formatHour(val) {
      return moment(val).format('HH:mm');
    },
    commentTime(val) {
      return moment(val).format('DD/MM/YYYY HH:mm');
    }
  }
};
</script>

<style scoped>
.screen {
  position: relative;
}
.screen::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 4;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.9)
  );
}

.people-icon {
  width: 14px;
}

.event-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s;
}

.screen {
  position: relative;
}

.screen::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: 3px;
  z-index: 2;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.33),
    rgba(0, 0, 0, 0.39)
  );
}

.event-img {
  width: 100%;
  height: 330px;
  object-fit: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 1s ease;
  background-position: center, center;
  transition: all 1s ease;
}

.event-header {
  display: flex;
  justify-content: space-between;
  color: #ffffffd1;
  z-index: 5;
  padding: 0 5px;
  margin: 0 0 10px 10px;

  align-items: center;
}
.event-header h1 {
  margin: 0;
}

.event-time {
  display: flex;
  align-items: center;
}

.event-time p {
  padding: 2px;
  margin: 0;
}

.event-dest-container {
  width: 90%;
  margin: 0 10px;
}

.attends-container {
  cursor: pointer;
}

.attends-container:hover {
  text-decoration: underline;
}

.attends-img {
  position: relative;
  height: 25px;
  width: 25px;
  object-fit: cover;
  border-radius: 50%;
}

.attends-container span {
  position: relative;
  right: 15px;
}

.btns-container {
  display: flex;
  width: 100px;
  justify-content: space-between;
  cursor: pointer;
  font-size: 0.6em;
  margin: 10px 0;
}

.details-container {
  margin: 10px 0 0 0;
}
.tags-container span {
  margin: 0.5em;
}

.map {
  width: 100%;
  height: 250px;
}

.comments {
  align-self: flex-start;
}

.comment {
  display: flex;
  align-items: center;
}

.comment span span {
  font-size: 10px;
}

.comment img {
  height: auto;
  width: 60px;
  margin: 1em;
  cursor: pointer;
}

.new-comment-input {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  margin: 0 1em;
  width: 90%;
}
.el-tag-comment {
  display: flex;
  flex-wrap: wrap;
  height: auto;
  white-space: unset;
  margin: 0 0 10px 0;
}

@media screen and (max-width: 850px) {
  .details-container {
    flex-direction: column;
  }
}

@media screen and (max-width: 750px) {
  .event-header {
    flex-direction: column;
    align-items: end;
  }
}

@media only screen and (max-width: 580px) {
  .container {
    padding: 0 20px;
  }
}
</style>
