<template>
  <div class="event-details">
    <img class="event-img" :src="event.img"/>
    <div class="event-header">
      <h2>{{event.name}}</h2>
      <p class="event-time">
        {{event.date}}
        <!-- {{event.date | formatDate}},
        {{event.date | formatHour}} -->
      </p>
    </div>
    At: {{event.loc.title}}
    <div class="attends-container">
      <img class="people-icon" src="../img/people-icon.png"/>
      {{event.attends.length}} people attending
    </div>
    <div class="btns-container">
      <div>
        <i class="far fa-check-circle fa-2x" @click="attendEvent()"></i><br/>
        Join
      </div>
      <div>
        <i class="fas fa-share-alt fa-2x" @click="shareEvent()"></i><br/>
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
    <div class="map" ref="map"></div>
    <h3>Comments:</h3>
    <ul>
      <li v-for="comment in event.comments">
        
      </li>
    </ul>
  </div>
</template>

<script>
import geocodingService from '../services/geocodingService';
import eventService from '../services/eventService';

export default {
  name: 'home',
  data() {
    return {
      event: {
        _id: '0323254',
        creatorId: '0323569',
        name: '**Chasing waterfalls!**',
        loc: { lng: 32.327004, lat: 34.858712 },
        estTime: 180,
        desc:
          'Let’s take this beutiful friday noon to explore the magics of Hazuri stream',
        imgUrl:
          'https://i.ytimg.com/vi/xC5n8f0fTeE/maxresdefault.jpg',
        attends: [],
        comments: [],
        lvl: 0
      },
      eventAddress: ''
    };
  },
  created() {
    let idFromParams = this.$route.params.eventId
    console.log('event id sent:', idFromParams);
    eventService.getById(idFromParams)
    .then(res => {
      console.log('got res:', res);      
      return this.event = JSON.parse(JSON.stringify(res))
    })
    // .then()
    // geocodingService.getAddressFromLoc(this.event.loc)
    // .then(address => {
    //   // console.log('address:', address);
    //   this.eventAddress = address;
    // });
  },
  mounted() {
    this.initMap();
  },
  methods: {
    attendEvent() {
      console.log('attending the event');
    },
    shareEvent() {
      console.log('sharing the event');
    },
    initMap() {
      var map = new google.maps.Map(this.$refs.map, {
        zoom: 4,
        center: this.event.loc
      });
      var marker = new google.maps.Marker({
        position: this.event.loc,
        map: map
      });
    }
  },
  computed: {
    eventLvl() {
      if (this.event.lvl === 0) {
        return 'Easy walk';
      }
      if (this.event.lvl === 1) {
        return 'Moderate walk';
      } else if (this.event.lvl === 2) {
        return 'Demanding walk';
      }
    }
  },
  components: {},
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

.event-time {
  margin: auto 1em;
  width: 11em;
  text-align: center;
}

.btns-container {
  display: flex;
  align-items: center;
  margin: 0 1em;
}

.btns-container div {
  margin: 10px;
  text-align: center;
}

.map {
  width: 100%;
  height: 250px;
}
</style>
