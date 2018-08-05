<template>
  <section class="traveler-details">
    <div class="user-details" v-if="user" v-show="!isChatMode">
        <div class="user-img-cover screen">
            <img class="user-img" :src=" `${user.img}`" alt="">
        </div>
        <div class="user-pre-details container">
            <div class="name">
                <h2>{{user.name.first}} {{user.name.last}}, {{user.age}}
                </h2>

                <button 
                class="chat-icon" 
                @click="toggleChat"
                v-if="$store.getters.loggedinUser._id !== $route.params.userId"
                >
                    <i class="far fa-comments"></i>
                </button>
            </div>
            <div>
                <strong>About me: </strong> 
                <p>
                  {{user.about.desc}}
                </p>
            </div>
            <div class="title">
                <strong >Interests:  &thinsp;</strong>
                <span v-for="(interest, idx) in user.about.interests" :key="interest"> {{interest}}
                 <span v-if="idx < user.about.interests.length-1" >•</span>
                </span>
            </div>
            <div class="title">
                <strong >Next Destinations: </strong>
                <span v-for="dest in user.about.nextDest" :key="dest"> {{dest}}, </span>
            </div>
            <div class="langs">
                <langs v-for="langs in user.about.langs" :key="langs" :langs="langs"></langs>
            </div>
            <div>
                <h3>Events I'm going to:</h3>
            </div>
            <div class="user-events">
                <EventPreview 
                v-for="event in userEvents"
                :key="event._id"
                :event="event" 
                ></EventPreview>
            </div>

        </div>
    </div>
    <!-- <ChatWindow :otherUser="user" v-if="isChatMode"/>  -->
    <!-- Possible: Apply the chat room before the user click the button by v-show -->
</section>
</template>

<script>
import userService from '../services/userService';
import eventService from '../services/eventService';
import EventPreview from '@/components/EventPreview.vue';
import ChatWindow from '@/components/ChatWindow.vue';
import langs from '@/components/travelers/langs.vue';
import eventBusService, { TOGGLE_CHAT } from '@/services/eventBusService';

export default {
  name: 'TravelerDetails',
  components: {
    langs,
    EventPreview,
    ChatWindow
  },
  data() {
    return {
      user: null,
      userEvents: null,
      isChatMode: false
    };
  },
  computed: {},
  created() {
    let idFromParams = this.$route.params.userId;
    userService.getById(idFromParams).then(user => {
      this.user = user;
      console.log('user', user);
    });
  },
  methods: {
    toggleChat() {
      const loggedUser = this.$store.getters.getUser;
      if (loggedUser._id) {
        eventBusService.$emit(TOGGLE_CHAT, this.user);
        // this.isChatMode = true;
        // this.$router.push(`/chat/${this.user}`);
      } else {
        this.$message.error('Please login to contact other travelers');
        this.$router.push('/login');
      }
    }
  },
  watch: {
    user() {
      if (this.user) {
        var eventsPrms = this.user.activity.events.map(eventId => {
          return eventService.getById(eventId);
        });
        return Promise.all(eventsPrms).then(events => {
          console.log('events', events);
          this.userEvents = events;
          console.log('userEvents', this.userEvents);
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.user-img-cover {
  height: 350px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url('../assets/img/cover-img.jpg');
}

.user-img {
  width: 200px;
  position: relative;
  top: 20%;
  left: 73%;
  z-index: 4;
}

.screen {
  position: relative;
}
.screen::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 3;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(213, 205, 205, 0.27),
    rgba(255, 248, 248, 0.66)
  );
}

.title {
  margin: 10px 0;
}
.name {
  display: flex;
  align-items: center;
}
.chat-icon {
  border: none;
  color: #35495e;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.35rem;
  padding: 0 0 0 30px;
}
.fa-comments:before {
  content: '\f086';
  font-size: 2em;
}
.bold {
  font-weight: bold;
}
.user-events {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

@media screen and (max-width: 850px) {
  .user-img {
    left: 70%;
  }
}

@media screen and (max-width: 750px) {
  .user-img {
    left: 67%;
  }
}
@media screen and (max-width: 650px) {
  .user-img {
    left: 58%;
  }
}
@media screen and (max-width: 550px) {
  .user-img {
    left: 52%;
  }
}
@media screen and (max-width: 450px) {
  .user-img {
    left: 25%;
  }
}
</style>
