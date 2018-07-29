<template>
  <div class="event">
    <LocationInput v-if="user.loc"></LocationInput>
    <EventList v-if="user.loc" :events="events" v-on:selected="openSelectedEvent"></EventList>
  </div>
</template>

<script>
// @ is an alias to /src
import EventList from '@/components/EventList.vue';
import LocationInput from '@/components/LocationInput.vue';

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
      this.loadEvent();
    },
    loadEvent() {
      this.$store
        .dispatch(LOAD_EVENTS)
        .then()
        .catch(err => {
          console.log('err in load events', err);
        });
    },
    openSelectedEvent(event) {
      this.$router.push(`event/${event._id}`);
    }
  }
};
</script>
