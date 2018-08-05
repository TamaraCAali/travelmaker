<template>
  <div class="event">
    <el-carousel indicator-position="none" :interval="6000">
      <el-carousel-item v-for="item in titles" :key="item">
        <h1 class="el-carousel-titel-h1">{{item}}</h1>
      </el-carousel-item>
    </el-carousel>
    <!-- <div class="screen"></ div> -->
    <div class="container">
      <div class="events-header">
        <div  class="new-add-container"  @click="$router.push('/event/edit/newEvent')">
          <div class="new-event">
            <i class="far fa-plus-square fa-2x"></i>
            add event
          </div>
        </div>
      <LocationInput v-if="user.loc" @events-changed="getEvents"></LocationInput>
      <div class="sliders-btn-container" @click="showEventsFilter = !showEventsFilter"> 
<<<<<<< HEAD
        <i class="fas fa-sliders-h"></i>
=======
        <i class="fas fa-sliders-h"></i><div class="raduis-title">search options</div>
>>>>>>> cc08433b776f580c199cb08410b4d33671bd0600
      </div>
    </div>
   
    <events-filter v-if="showEventsFilter" 
      @events-changed="getEvents" 
      @just-radius-changed="loadEvent(user)">
    </events-filter>
    <hr>
    <EventListCarousel v-if="events" :events="events" >
      <template slot="header">
        <h3>Events Today and Tomorrow</h3>
      </template>
    </EventListCarousel>

    <EventListCarousel v-if="events" :events="events" >
      <template slot="header">
        <h3>1 day trips</h3>
      </template>
    </EventListCarousel>

    <EventListCarousel v-if="events" :events="events" >
      <template slot="header">
        <h3>Events longer then 2 days</h3>
      </template>
    </EventListCarousel>

    <TraveleerListCarousel v-if="users" :users="users">
      <template slot="header">
        <h3>Users around you</h3>
      </template>
    </TraveleerListCarousel>
    
    <EventList v-if="events" :events="events">
      <template slot="header">
        <h3>All events near you</h3>
      </template>
    </EventList>


    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import locService from '@/services/locationService.js';
import EventBusService, { LOGIN } from '../services/eventBusService.js';
import { LOAD_EVENTS } from '../storeModules/eventModule.js';
import { SET_FILTER } from '../storeModules/eventModule.js';
import { UPDATE_USER } from '../store.js';
import { LOAD_USERS } from '../storeModules/userModule.js';

import EventList from '@/components/EventList.vue';
import EventListCarousel from '@/components/EventListCarousel.vue';

import LocationInput from '@/components/LocationInput.vue';
import eventsFilter from '@/components/EventsFilter.vue';
import TravelersList from '@/components/travelers/TravelersList.vue';
import TraveleerListCarousel from '@/components/travelers/TraveleerListCarousel.vue';

export default {
  name: 'Event',
  components: {
    LocationInput,
    EventList,
    eventsFilter,
    TravelersList,
    EventListCarousel,
    TraveleerListCarousel
  },
  data() {
    return {
      showEventsFilter: false,
      user: null,
      events: null,
      users: null,
      titles: [
        'Traveling together is easier than ever!',
        'Find events in your area',
        'Meet new friends and travel together',
        'Get the most out of your trip'
      ]
    };
  },
  created() {
    this.$store.dispatch(SET_FILTER, { filterBy: null });
    this.loadUser();
  },
  computed: {},
  methods: {
    loadUser() {
      this.user = this.$store.getters.loggedinUser;
      locService.getAppLoc().then(currLoc => {
        this.user.loc = currLoc;
        this.user.isActive = true;
        var user = this.user;
        this.$store.dispatch(UPDATE_USER, { user });
        console.log('user', this.user);
        EventBusService.$emit(LOGIN, this.user.img);
        this.loadEvent(this.user);
        this.loadUsers(this.user);
      });
    },
    loadEvent(user) {
      this.$store
        .dispatch(LOAD_EVENTS, { user })
        .then(() => {
          this.events = this.$store.getters.eventForDisplay;
          console.log('events cmp got events', this.events);
        })
        .catch(err => {
          console.log('err in load events', err);
        });
    },
    loadUsers(user) {
      this.$store
        .dispatch(LOAD_USERS, { user })
        .then(users => {
          // console.log('users', users);
          this.users = users;
        })
        .catch(err => {
          console.log('err in load users');
        });
    },
    onNewEvent() {
      if (this.user._id) this.$router.push('/event/edit/newEvent');
      else {
        this.$message.error('Please login to create an event');
        this.$router.push('/login');
      }
    },
    getEvents() {
      this.events = this.$store.getters.eventForDisplay;
      if (!this.events[0]) {
        this.$message.error('No events in that area');
      }
      console.log('events cmp got events', this.events);
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
  height: 100%;
}

.el-carousel-titel-h1 {
  position: absolute;
  bottom: 1em;
  color: white;
  font-size: 3em;
  padding: 10px;
  font-family: BreeSerif;
}

.el-carousel__item::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.9)
  );
}

.el-carousel__item:nth-child(4n) {
  background-color: #99a9bf;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url('../assets/img/homePage.jpg');
}

.el-carousel__item:nth-child(4n + 1) {
  background-color: #99a9bf;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url('../assets/img/groups-hero.jpg');
}
.el-carousel__item:nth-child(4n + 2) {
  background-color: #99a9bf;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url('../assets/img/group_travel.jpg');
}
.el-carousel__item:nth-child(4n + 3) {
  background-color: #99a9bf;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url('../assets/img/family.jpg');
}

.sliders-btn-container {
  cursor: pointer;
  font-size: 1.1em;
  display: flex;
  flex-direction: column;
  text-align: center;
}

@media screen and (max-width: 700px) {
  .events-header {
    flex-direction: column-reverse;
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
