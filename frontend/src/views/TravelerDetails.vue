<template>
  <section class="traveler-details">
    <div class="user-details" v-if="user" v-show="!isChatMode">
        <div>
            <img class="user-img" :src=" `${user.img}`" alt="">
        </div>
        <div class="user-pre-details">
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
            <div>
                <strong>Interests:  &thinsp;</strong>
                <span v-for="(interest, idx) in user.about.interests" :key="interest"> {{interest}}
                 <span v-if="idx < user.about.interests.length-1" >❦</span>
                </span>
            </div>
            <div>
                <strong>Next Destinations: </strong>
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
                v-on:selected="openSelectedEvent(event)"></EventPreview>
            </div>

        </div>
    </div>
    <ChatWindow :otherUser="user" v-if="isChatMode"/> 
    <!-- Possible: Apply the chat room before the user click the button by v-show -->
</section>
</template>

<script>
import userService from '../services/userService';
import eventService from '../services/eventService';
import EventPreview from '@/components/EventPreview.vue';
import ChatWindow from '@/components/ChatWindow.vue';
import langs from '@/components/travelers/langs.vue';

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
    openSelectedEvent(event) {
      this.$router.push(`/event/${event._id}`);
    },
    toggleChat() {
      console.log(this.user);
      this.isChatMode = true;
      // this.$router.push(`/chat/${this.user}`);
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
h3 {
  text-align: center;
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: beige;
  box-shadow: 0 0 5px #00000063;
  margin: 10px;
  padding: 10px;
  transition: all 0.3s;
}

.user-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
.user-pre-details div {
  margin: 10px 0;
}
.name {
  display: flex;
  justify-content: space-between;
  // align-items: flex-end;
}
.chat-icon {
  font-size: 1.35rem;
}
.fa-comments:before {
  content: '\f086';
  font-size: 2em;
}
.bold {
  font-weight: bold;
}
.user-events {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
