<template>
  <section class="event-preview">
      <div class="event" @click="openEventDetails">
          <div class="event-cover">
            <div class="event-img" :style="'background-image: url('+event.img+')'">
            </div>
            <p>{{event.name}} <br/>
              <span  class="date">{{date}}</span> 
            </p>
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
      return moment(this.event.startTime).format('MMM Do');
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
      this.$router.push(`/event/${this.event._id}`);
    }
  }
};
</script>

<style scoped lang="scss">
.event-preview {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 5px;
}
.event {
  width: 100%;
  box-shadow: 0 0 0px #00000063;
  transition: all 0.3s;
  cursor: pointer;
  padding: 0 0 5px 0;
  height: 245px;
}

.event-cover {
  position: relative;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  transition: all 1s ease;
}

.event-img {
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center, center;
  transition: all 0.8s ease;
}

.event-cover:hover .event-img {
  transform: scale(1.08);
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
.event-cover p {
  position: absolute;
  width: 100%;
  color: whitesmoke;
  padding: 3px 5px;
  background-color: #607d8ba8;
  font-size: 13px;
}
.bold {
  font-weight: bold;
}
</style>
