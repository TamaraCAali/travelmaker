<template>
  <div class="event">
    <div class="events-header">
      <div class="new-event-container" @click="$router.push('/event/edit/newEvent')">
        <div class="new-event">
          <i class="far fa-plus-square fa-2x"></i>
            New event
        </div>
      </div>
      <LocationInput v-if="user.loc"></LocationInput>
    </div>
    <EventList v-if="events"  :events="events" v-on:selected="openSelectedEvent"></EventList>
  </div>
</template>

<script>
// @ is an alias to /src
import locService from '@/services/locationService.js';
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
    return {
      user: null,
      events: null
    };
  },
  created() {
    this.loadUser();
  },
  computed: {
    // events() {
    //   return this.$store.getters.eventForDisplay;
    // }
  },
  methods: {
    loadUser() {
      this.user = this.$store.getters.loggedinUser;
      locService.getAppLoc().then(currLoc => {
        this.user.loc = currLoc;
        console.log('user', this.user);
        EventBusService.$emit(LOGIN, this.user.img);
        this.loadEvent(this.user);
      });
    },
    loadEvent(user) {
      this.$store
        .dispatch(LOAD_EVENTS, { user })
        .then(events => {
          console.log('events', events);
          this.events = events;
        })
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
  display: flex;
  justify-content: center;
  position: relative;
  padding: 2em 0 0 1em;
}

.new-event-container {
  /* position: relative; */
  position: absolute;
  left: 10px;
}

.new-event {
  cursor: pointer;
  padding: 5px 8px;
  margin: 0 2em;
  border-radius: 4px;
  background-color: #f5f5dc;
  display: flex;
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

  .new-event-container {
    position: static;
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
