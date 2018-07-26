<template>
  <div class="event-preview">
      <div class="event" @click="openEventDetails">
          <div class="event-img">
            <p>**Chasing waterfalls!** 4.8</p>
          </div>
          <div class="event-pre-details">
            <p>At: Hazuri stream, 800m away</p>
            <p><i class="fas fa-user-friends"></i> 26 people are attending</p>
          </div>
      </div>
      <div class="event">
          <div class="event-img">
            <p>Shuk hangout 6.8</p>
          </div>
          <div class="event-pre-details">
            <p>At: Katzrin market, 320m away</p>
            <p><i class="fas fa-user-friends"></i> 8 people are attending</p>
          </div>
      </div>
      <div class="event">
          <div class="event-img">
              <p>**Chasing waterfalls!** 4.8</p>
          </div>
          <div class="event-pre-details">
            <p>At: Hazuri stream, 800m away</p>
            <p><i class="fas fa-user-friends"></i> 26 people are attending</p>
          </div>
      </div>
      <div class="event">
          <div class="event-img">
            <p>Shuk hangout 6.8</p>
          </div>
          <div class="event-pre-details">
            <p>At: Katzrin market, 320m away</p>
            <p><i class="fas fa-user-friends"></i> 8 people are attending</p>
          </div>
      </div><div class="event">
          <div class="event-img">
              <p>**Chasing waterfalls!** 4.8</p>
          </div>
          <div class="event-pre-details">
            <p>At: Hazuri stream, 800m away</p>
            <p><i class="fas fa-user-friends"></i> 26 people are attending</p>
          </div>
      </div>
      <div class="event">
          <div class="event-img">
            <p>Shuk hangout 6.8</p>
          </div>
          <div class="event-pre-details">
            <p>At: Katzrin market, 320m away</p>
            <p><i class="fas fa-user-friends"></i> 8 people are attending</p>
          </div>
      </div><div class="event">
          <div class="event-img">
              <p>**Chasing waterfalls!** 4.8</p>
          </div>
          <div class="event-pre-details">
            <p>At: Hazuri stream, 800m away</p>
            <p><i class="fas fa-user-friends"></i> 26 people are attending</p>
          </div>
      </div>
      <div class="event">
          <div class="event-img">
            <p>Shuk hangout 6.8</p>
          </div>
          <div class="event-pre-details">
            <p>At: Katzrin market, 320m away</p>
            <p><i class="fas fa-user-friends"></i> 8 people are attending</p>
          </div>
      </div><div class="event">
          <div class="event-img">
              <p>**Chasing waterfalls!** 4.8</p>
          </div>
          <div class="event-pre-details">
            <p>At: Hazuri stream, 800m away</p>
            <p><i class="fas fa-user-friends"></i> 26 people are attending</p>
          </div>
      </div>
      <div class="event">
          <div class="event-img">
            <p>Shuk hangout 6.8</p>
          </div>
          <div class="event-pre-details">
            <p>At: Katzrin market, 320m away</p>
            <p><i class="fas fa-user-friends"></i> 8 people are attending</p>
          </div>
      </div>
<!-- <div class="event">
      <div>name:{{event.name}}</div>
      <div>date:{{event.date}}</div>
      <div>loc:{{event.loc}}</div>
      <div><i class="fas fa-user-friends"></i> {{event.attends}} people are attending</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'EventPreview',
  props: {
    event: Object
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
}
.event {
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
  background-image: url('../assets/img/maxresdefault.jpg');
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
  .event {
    width: 32%;
  }
}

@media only screen and (max-width: 760px) {
  .event {
    width: 45%;
  }
}

@media only screen and (max-width: 500px) {
  .event {
    width: 96%;
  }
}
</style>
