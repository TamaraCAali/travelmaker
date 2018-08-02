<template>
  <section class="event-preview">
      <div class="event" @click="openEventDetails">
          <div class="event-img" :style="'background-image: url('+event.img+')'">
            <p>{{event.name}} </p>
              <p><span  class="date">{{date}}</span></p> 
          </div>
          <div class="event-pre-details">
            <p>{{title}}...</p>
            <p><span class="bold"> </span>{{dist}} away</p>
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
      const userLoc = this.$store.getters.getCurrLoc;
      var cords = userLoc.coordinates;
      if (userLoc) {
        const dist = locService
          .getDistance(cords, this.event.loc.coordinates)
          .toFixed();
        if (dist < 1) return dist + ' m';
        else return dist + ' km';
        return dist;
      }
    },
    title: function() {
      return this.event.loc.title.substr(0, 40);
    }
  },
  methods: {
    openEventDetails() {
      this.$router.push(`event/${this.event._id}`);
    }
  }
};
</script>

<style scoped lang="scss">
.event-preview {
  width: 100%;
  border: 1px solid #ccc;
}
.event {
  width: 100%;
  box-shadow: 0 0 0px #00000063;
  transition: all 0.3s;
  cursor: pointer;
  padding: 0 0 5px 0;
}

.event-img {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 150px;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 1s ease;
  background-position: center, center;
  transition: all 1s ease;
}

.event-img:hover {
  transition: 1s ease;
}
.event-pre-details {
  padding: 5px 0 0 0;
  font-size: 0.8em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.event p {
  padding: 3px 5px;
  margin: 0;
}
.event-img p {
  color: whitesmoke;
  padding: 3px 5px;
  background-color: #607d8ba8;
  font-size: 13px;
}
.bold {
  font-weight: bold;
}
</style>
