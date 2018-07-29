<template>
  <div class="traveler-details">
          <div class="user" v-if="user">
          <div >
            <img class="user-img" :src=" `${user.img}`">
          </div>
          <div class="user-pre-details">
            <div class="name"><span class="bold">{{user.name.first}} {{user.name.last}}, age: {{user.age}}</span><span class="chat-icon" @click="openChat"> <i class="far fa-comments"></i></span></div>
            <div><span class="bold">About me </span> {{user.about.desc}}</div>
            <div><span class="bold">Interests </span> <span v-for="interest in user.about.interests" :key="interest"> {{interest}}, </span></div>
             <div class="langs">
              <langs v-for="langs in user.about.langs" :key="langs" :langs="langs"></langs>
            </div>
            <div><span class="bold">Going to the next events </span> </div>
            <div class="user-events">
              <EventPreview v-for="event in userEvents" :key="event._id" :event="event" v-on:selected="openSelectedEvent(event)"></EventPreview>
            </div>
           
          </div>
      </div>
  </div>
</template>

<script>
import userService from '../services/userService';
import eventService from '../services/eventService';
import EventPreview from '@/components/EventPreview.vue';
import langs from '@/components/travelers/langs.vue';

export default {
  name: 'TravelerDetails',
  components: {
    langs,
    EventPreview
  },
  data() {
    return {
      user: null,
      userEvents: null
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
    openChat() {
      console.log(this.user);

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
.traveler-details {
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
  align-items: flex-end;
}
.chat-icon {
  float: right;
  cursor: pointer;
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
