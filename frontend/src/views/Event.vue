<template>
  <div class="event">
    <div class="events-header">
      <div class="new-event-container" @click="onNewEvent">
        <div class="new-event">
          <i class="far fa-plus-square fa-2x"></i>
            New event
        </div>
      </div>
      <LocationInput v-if="user.loc"></LocationInput>
    </div>
    <EventList v-if="user.loc" :events="events" v-on:selected="openSelectedEvent"></EventList>
  </div>
</template>

<script>
// @ is an alias to /src
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
    return { user: null };
  },
  created() {
    this.loadUser();
  },
  computed: {
    events() {
      return this.$store.getters.eventForDisplay;
    }
  },
  methods: {
    loadUser() {
      this.user = this.$store.getters.loggedinUser;
      console.log('event', this.user);
      EventBusService.$emit(LOGIN, this.user.img);
      this.loadEvent(this.user);
    },
    loadEvent(user) {
      this.$store
        .dispatch(LOAD_EVENTS, { user })
        .then()
        .catch(err => {
          console.log('err in load events', err);
        });
    },
    openSelectedEvent(event) {
      this.$router.push(`event/${event._id}`);
    },
    onNewEvent() {
      if (this.user._id) this.$router.push('/event/edit/newEvent')
      else {
        this.$message.error('Please login to create an event');
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style>
.events-header {
  display:flex;
  justify-content: center;
  position: relative;
  padding: 1em 0;
}

.events-header .curr-loc{
  margin: 0 auto;
}

.new-event {
  cursor: pointer;
  position: absolute;
  /* bottom: 0px; */
  padding: 5px 8px;
  margin: 0 2em;
  border-radius: 4px;
  background-color: #f5f5dc;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  transition: 0.2s;
}
.new-event:hover {
  background-color: #e0e0ca;
}

.new-event i {
  margin-right: 5px;
  transition: 0.2s;
}
.new-event:hover i {
  margin-right: 10px;
}

@media screen and (max-width: 700px) {
  .events-header {
    flex-wrap: wrap-reverse;
  }

  .curr-loc {
    margin: 0;
  }

  .new-event {
    position: static;
  }

  .new-event:hover i {
    margin-right: 5px;
  }
}
@media screen and (max-width: 570px) {
  .new-event:hover i {
    margin-right: 10px;
  }
}
</style>
