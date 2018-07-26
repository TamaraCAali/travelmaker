<template>
  <section class="event-preview">
      <div class="event" @click="openEventDetails">
          <div class="event-img" :style="'background-image: url('+event.img+')'">
            <p>{{event.name}}  {{date}} </p>
          </div>
          <div class="event-pre-details">
            <p>{{event.loc.title}}, {{dist}} away</p>
            <p><i class="fas fa-user-friends"></i> {{event.attends.length}} people are attending</p>
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
      return moment(this.event.date).format('MMM Do YY');
    },
    dist: function() {
      const userLoc = this.$store.getters.getCurrLoc;
      const dist = locService.getDistance(userLoc, this.event.loc).toFixed();
      if (dist < 1) return dist + ' m';
      else return dist + ' km';
      return dist;
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
  background-color: beige;
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
  // background-image: url('../assets/img/maxresdefault.jpg');
  background: linear-gradient(rgba(0, 0, 0, 0.21), rgba(0, 0, 0, 0.35)),
    url(/img/maxresdefault.28e174ef.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  padding: 10px;
  transition: all 1s ease;
  opacity: 0.8;
}
.event-img:hover {
  opacity: 1;
  transition: 1s ease;
}
.event-pre-details {
  padding: 5px 10px;
}
.event p {
  margin: 0;
}
.event-img p {
  color: whitesmoke;
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
