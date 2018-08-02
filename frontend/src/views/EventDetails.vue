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
                          <template v-if="!userIsAttending">
                            <i class="far fa-check-circle fa-2x"></i><br/>
                          </template>
                          <template v-else>
                            <i class="far fa-times-circle fa-2x"></i><br/>
                          </template>
                        </div>
                        <div @click="showCopyUrlMsg">
                            <i class="far fa-copy fa-2x" v-clipboard:copy="eventUrl"></i> <br/>
                        </div>
                        <i v-if="userIsAdmin"
                              @click="goEditEvent" 
                              class="edit-btn far fa-edit fa-2x"></i>
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
        <div class="flex details-container">
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
          <el-tag type="success">{{comment.txt}} <span>- {{comment.at | commentTime}}</span></el-tag>
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
        creatorImg: this.user.img,
        txt: this.newCommentTxt,
        at: Date.now()
      };
      this.event.comments.push(newComment);
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
    }
  },
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
  z-index: 80;
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
  position: relative;
  top: 50px;
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
  z-index: 100;
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
  width: 100%;
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
