<template>
  <div class="event">
    <LocationInput></LocationInput>
    <EventList :events="events" v-on:selected="openSelectedEvent"></EventList>
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
    return {};
  },
  created() {
    this.loadEvent();
  },
  computed: {
    events() {
      return this.$store.getters.eventForDisplay;
    }
  },
  methods: {
    loadEvent() {
      this.$store
        .dispatch(LOAD_EVENTS)
        .then()
        .catch(err => {
          console.log('err in load events');
        });
    },
    // openSelectedEvent(event) {
    //   this.$router.push(`event/${event._id}`);
    // }
    openSelectedEvent(event) {
      this.$router.push(`event/111`);
    }
  }
};
</script>
