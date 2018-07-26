<template>
  <div class="event-details">
    <div v-if="!event" class="loader">
      Loading Event...
    </div>
    <template v-else>
      <img class="event-img" :src="event.img"/>
      <div class="event-header">
        <i v-if="userIsAdmin"
           @click="goEditEvent" 
           class="edit-btn far fa-edit fa-2x"></i>
        <h2>{{event.name}}</h2>
        <p class="event-time">
          {{event.date | formatDate}} <br/>
          {{event.date | formatHour}}
        </p>
      </div>
      <div class="details-container">
        At: {{event.loc.title}}
        <div class="attends-container">
          <img class="people-icon" src="../img/people-icon.png"/>
          {{event.attends.length}} people attending
        </div>
      </div>
      <div class="btns-container">
        <div @click="toggleEventAttendence()">
          <template v-if="!userIsAttending">
            <i class="far fa-check-circle fa-2x"></i><br/>
            Join
          </template>
          <template v-else>
            <i class="far fa-times-circle fa-2x"></i><br/>
            Leave
          </template>
        </div>
        <div @click="shareEvent()">
          <i class="fas fa-share-alt fa-2x"></i><br/>
          Share 
        </div>
      </div>
      <p>
      {{event.desc}}
      </p>
      <div class="est-time-container">
        <i class="fas fa-walking"></i>
        {{eventLvl}}
      </div>
      <div class="difficulty-lvl-container">
        <i class="far fa-clock"></i>  
        Takes About: {{ event.estTime | stringifyEstTime }}
      </div>
      <div v-if="event" class="map" ref="map"></div>
      <h3>Comments:</h3>
      <ul>
        <li v-for="comment in event.comments">
          
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import moment from 'moment';
import locService from '../services/locationService';
import eventService from '../services/eventService';
import userService from '../services/userService';

export default {
  name: 'home',
  data() {
    return {
      event: {
        attends: [],
        loc: {lat: 33, lng: 35}
      },
      user: null,
      eventAddress: ''
    };
  },
  created() {
    let idFromParams = this.$route.params.eventId;
    // console.log('event id sent:', idFromParams);
    eventService.getById(idFromParams)
    .then(res => {
      console.log('got event:', res);
      return (this.event = JSON.parse(JSON.stringify(res)));
    });
    this.user = this.$store.getters.getUser;
    console.log('user:', this.user);
    
  },
  mounted() {
    this.initMap();
  },
  methods: {
    toggleEventAttendence() {
      if (this.userIsAttending) {
        console.log('leaving')       
        let userIdx = this.event.attends.findIndex(id => id === this.user._id)
        this.event.attends.splice(userIdx, 1)
        eventService.update(this.event)
        let eventIdx = this.user.activity.events.findIndex(id => id === this.event._id)
        this.user.activity.events.splice(eventIdx, 1)
        userService.update(this.user)
      } else {
        console.log('attending');
        this.event.attends.push(this.user._id)
        eventService.update(this.event)
        this.user.activity.events.push(this.event._id)
        userService.update(this.user)
      }
    },
    shareEvent() {
      console.log('sharing the event');
    },
    initMap() {
      // if (!this.event || !this.event.loc) return
      var map = new google.maps.Map(this.$refs.map, {
        zoom: 4,
        center: this.event.loc
      });
      var marker = new google.maps.Marker({
        position: this.event.loc,
        map: map
      });
    },
    goEditEvent() {
      this.$router.push(`edit/${this.event._id}`);
    }
  },
  computed: {
    eventLvl() {
      if (this.event.lvl === 0) {
        return 'Easy walk';
      }
      if (this.event.lvl === 1) {
        return 'Moderate walk';
      } 
      else if (this.event.lvl === 2) {
        return 'Demanding walk';
      }
    },
    userIsAttending() {
      if (this.user && this.user._id) return this.event.attends.includes(this.user._id)
      else return false
    },
    userIsAdmin() {
      return true
      // return this.event.creatorId === this.user._id
    }
    // event() {
    //   this.initMap()
    // }
  },
  watch: {
    event() {
      this.initMap()
      // console.log('is user attending?', this.userIsAttending);
    }
  },
  filters: {
    stringifyEstTime(val) {
      if (+val < 60) {
        return val + ' minutes';
      }
      if (+val > 1440) {
        let daysCount = +val / 720;
        daysCount = daysCount.toFixed() / 2; //Support .5 days
        return `About ${daysCount} days`;
      } else {
        let hoursCount = +val / 30;
        hoursCount = hoursCount.toFixed() / 2; //Support .5 hours
        return `About ${hoursCount} hours`;
      }
    },
    formatDate(val) {
      return moment().format('MMM Do');
    },
    formatHour(val) {
      return moment().format('HH:mm');
    }
  }
};
</script>

<style>
  .people-icon {
    width: 14px;
  }

  .event-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: beige;
    box-shadow: 0 0 5px #00000063;
    margin: 10px;
    padding: 10px;
    transition: all 0.3s;
  }

  .event-img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  .event-header {
    margin: 0 auto;
    display: flex;
  }

  .edit-btn {
    margin: auto 1em;
    cursor: pointer;
  }

  .event-time {
    width: 4em;
    text-align: center;
  }

  .details-container {
    align-self: flex-start;
    padding: 0 10px;
  }
  .btns-container {
    display: flex;
    align-items: center;
    margin: 0 1em;
  }

  .btns-container div {
    margin: 10px;
    text-align: center;
    cursor: pointer;
  }

  .map {
    width: 100%;
    height: 250px;
    margin: 10px;
  }
</style>
