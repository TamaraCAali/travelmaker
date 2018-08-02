<template>
  <div class="event">
        <div class="screen">
          <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in titles" :key="item">
            <h1 class="el-carousel-titel-h1">{{item}}</h1>
        </el-carousel-item>
      </el-carousel>
        </div>
        <div class="container">
    <div class="events-header">
      <div  class="new-add-container"  @click="$router.push('/event/edit/newEvent')">
        <div class="new-event">
          <i class="far fa-plus-square fa-2x"></i>
            add event
        </div>
      </div>
      <LocationInput v-if="user.loc"></LocationInput>
    </div>
    <hr>
    <EventList v-if="events"  :events="events" ></EventList>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import locService from '@/services/locationService.js';
import EventList from '@/components/EventList.vue';
import LocationInput from '@/components/LocationInput.vue';
import EventBusService, { LOGIN } from '../services/eventBusService.js';
import { LOAD_EVENTS } from '../storeModules/eventModule.js';

export default {
  name: 'Event',
  components: {
    LocationInput,
    EventList
  },
  data() {
    return {
      user: null,
      events: null,
      titles: [
        'Traveling together is easier than ever',
        'Meet new friends and travel together',
        'Find events in your eara',
        'Get the most out of your trip'
      ]
    };
  },
  created() {
    this.loadUser();
  },
  computed: {},
  methods: {
    loadUser() {
      debugger;
      this.user = this.$store.getters.loggedinUser;
      locService.getAppLoc().then(currLoc => {
        this.user.loc = currLoc;
        console.log('user', this.user);
        EventBusService.$emit(LOGIN, this.user.img);
        this.loadEvent(this.user);
      });
    },
    loadEvent(user) {
      this.$store
        .dispatch(LOAD_EVENTS, { user })
        .then(events => {
          console.log('events', events);
          this.events = events;
        })
        .catch(err => {
          console.log('err in load events', err);
        });
    },

    onNewEvent() {
      if (this.user._id) this.$router.push('/event/edit/newEvent');
      else {
        this.$message.error('Please login to create an event');
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style>
.enent {
  display: flex;
  flex-direction: column;
}
.events-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.new-event {
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 25px;
  background-color: #41b883;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  color: white;
  width: 170px;
  text-transform: uppercase;
}
.new-event:hover {
  background-color: #326d53;
}

.new-event i {
  margin-right: 5px;
  transition: 0.2s;
}
.new-event:hover i {
  margin-right: 10px;
}

.el-carousel {
  overflow: hidden;
  height: calc(100vh - 30vh);
}
.el-carousel .el-carousel__container {
  height: 450px;
}
.h3-carousel {
  color: white;
  font-size: 2.3em;
  margin: 70px 0 0 10px;
  text-shadow: -1px -1px 0 rgba(47, 56, 69, 0.5),
    1px -1px 0 rgba(47, 56, 69, 0.5), -1px 1px 0 rgba(47, 56, 69, 0.5),
    1px 1px 0 rgba(47, 56, 69, 0.5);
}

.el-carousel-titel-h1 {
  position: absolute;
  bottom: 0;
  color: white;
  font-size: 3em;
  padding: 10px;
  z-index: 90;
}

.el-carousel__item:nth-child(1n) {
  background-color: #99a9bf;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url('../assets/img/homePage.jpg');
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url('../assets/img/group_travel.jpg');
}
.el-carousel__item:nth-child(3n) {
  background-color: #99a9bf;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url('../assets/img/groups-hero.jpg');
}
.el-carousel__item:nth-child(4n) {
  background-color: #99a9bf;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url('../assets/img/family.jpg');
}
.el-carousel__indicators--outside {
  display: none;
}

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

@media screen and (max-width: 700px) {
  .events-header {
    flex-wrap: wrap-reverse;
  }

  .curr-loc {
    margin: 0;
  }

  .new-event:hover i {
    margin-right: 5px;
  }
}

@media screen and (max-width: 570px) {
  .new-event {
    text-align: center;
  }
  .new-event:hover i {
    margin-right: 10px;
  }
  .new-add-container {
    margin: 0 auto;
  }
}
</style>
