<template>
  <div class="event-details">
    <img :src="event.imgUrl"/>
    <h2>{{event.name}}</h2>
    At: {{eventAddress}}
    <div class="attends-container">
      <img class="people-icon" src="../img/people-icon.png"/>
      {{event.attends.length}} people attending
    </div>
    <div class="btns-container">
      <i class="far fa-check-square" @click="attendEvent()"></i>
      <i class="fas fa-share-square" @click="shareEvent()"></i>
    </div>
    <p>
    {{event.desc}}
    </p>
    <div class="est-time-container">
      <i class="far fa-clock"></i>  
      {{eventLvl}}
    </div>
    <div class="difficulty-lvl-container">
      <i class="fas fa-walking"></i>
      Takes About: {{ event.estTime | stringifyTime }}
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

export default {
  name: 'home',
  data() {
    return {
      event: {
        _id: '0323254',
        creatorId: '0323569',
        name: '**Chasing waterfalls!**',
        loc: { lng: 32.993007, lat: 35.696192 },
        estTime: 180,
        desc:
          'Let’s take this beutiful friday noon to explore the magics of Hazuri stream',
        imgUrl:
          'http://www.nelech.co.il/Info/Images/4_5fca1ab7-0371-4fe9-aedf-92816adf201c.jpg',
        attends: [],
        comments: [],
        lvl: 0
      }
    };
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
    eventAddress() {
      // console.log('sent loc:', this.event.loc)
      geocodingService.getAddressFromLoc(this.event.loc).then(address => {
        // console.log('address:', address);
        return address;
      });
    },
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
    stringifyTime(val) {
      if (+val < 60) {
        return val + ' minutes';
      }
      if (+val > 1440) {
        let daysCount = +val / 1440;
        daysCount = daysCount.toFixed();
        return `About ${daysCount} days`;
      } else {
        let hoursCount = +val / 60;
        hoursCount = hoursCount.toFixed();
        return `About ${hoursCount} hours`;
      }
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

.map {
  width: 100%;
  height: 400px;
}
</style>
