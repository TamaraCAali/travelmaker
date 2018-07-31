<template>
  <section class="event-preview">
      <div class="event" @click="openEventDetails">
          <div class="event-img" :style="'background-image: url('+event.img+')'">
            <p>{{event.name}} <span class="date">{{date}}</span> </p>
          </div>
          <div class="event-pre-details">
            <p>{{title}}...<span class="bold"> {{dist}} away</span></p>
            <p><i class="fas fa-user-friends"></i> {{event.attends.length}} attending</p>
          </div>
      </div>
  </section>
</template>
<script>
import moment from 'moment';
import locService from '@/services/locationService.js';

export default {
  name: 'EventPreview',
  props: {
    event: Object
  },
  computed: {
    date: function() {
      return moment(this.event.startTime).format('MMM Do YY');
    },
    dist: function() {
      const userLoc = this.$store.getters.getCurrLoc.coordinates;
      if (userLoc) {
        const dist = locService
          .getDistance(userLoc, this.event.loc.coordinates)
          .toFixed();
        if (dist < 1) return dist + ' m';
        else return dist + ' km';
        return dist;
      }
    },
    title: function() {
      return this.event.loc.title.substr(0, 30);
    }
  },
  methods: {
    openEventDetails() {
      this.$emit('selected', this.event);
    }
  }
};
</script>

<style scoped lang="scss">
.event-preview {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 250px;
}
.event {
  width: 100%;
  background-color: #f5f5dc;
  box-shadow: 0 0 5px #00000063;
  margin: 5px;
  transition: all 0.3s;
  cursor: pointer;
}
.event-img {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 150px;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 10px;
  transition: all 1s ease;
  opacity: 0.8;
  background-position: center;
}
.event-img:hover {
  opacity: 1;
  transition: 1s ease;
}
.event-pre-details {
  padding: 5px 10px;
  font-size: 0.8em;
  display: flex;
  justify-content: space-between;
}
.event p {
  margin: 0;
  padding: 2px;
}
.event-img p {
  box-shadow: 0 0 5px whitesmoke;
  color: whitesmoke;
  padding: 3px;
  font-weight: bold;
  background-color: #607d8b5e;
}
.date {
  float: right;
}
.bold {
  font-weight: bold;
}

@media only screen and (max-width: 920px) {
  .event-preview {
    width: 32%;
  }
}

@media only screen and (max-width: 760px) {
  .event-preview {
    width: 45%;
  }
}

@media only screen and (max-width: 500px) {
  .event-preview {
    width: 96%;
  }
}
</style>
