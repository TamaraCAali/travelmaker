<template>
  <section class="traveler-profile">
    <div class="user-details" v-if="user">
        <div class="user-img-cover screen">
            <img class="user-img" :src=" `${user.img}`">
        </div>
        <div class="user-pre-details container">
            <div class="name">
                <h2>{{user.name.first}} {{user.name.last}}, {{user.age}}
                </h2>
                          <router-link class="router-link" to="/user/edit/:userId"><i class="far fa-edit"></i><span class="span-icon"></span></router-link>
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

</section>
</template>

<script>
import userService from '../services/userService';
import eventService from '../services/eventService';
import EventPreview from '@/components/EventPreview.vue';
import langs from '@/components/travelers/langs.vue';
import eventBusService, { TOGGLE_CHAT } from '@/services/eventBusService';

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
    this.user = this.$store.getters.getUser;
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
  },
  methods: {}
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
  top: 210px;
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
    top: 150px;
  }
}
@media screen and (max-width: 450px) {
  .user-img {
    left: 33%;
    top: 107px;
  }
}
</style>
