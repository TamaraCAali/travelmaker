<template>
  <div class="event">
    <CurrLocation></CurrLocation>
    <EventList  :events="events" v-on:selected="openSelectedEvent"></EventList>

    <!-- events: {{events}} -->
  </div>
</template>

<script>
// @ is an alias to /src
import EventList from '@/components/EventList.vue';
import CurrLocation from '@/components/CurrLocation.vue';

import { LOAD_EVENTS } from '../storeModules/eventModule.js';

export default {
  name: 'Event',
  components: {
    CurrLocation,
    EventList
  },
  data() {
    return {};
  },
  created() {
    console.log('loadEvent');
    this.loadEvent();
  },
  computed: {
    events() {
      console.log('computed');
      return this.$store.getters.eventForDisplay;
    }
  },
  methods: {
    loadEvent() {
      console.log('loadEvent methods');

      this.$store
        .dispatch(LOAD_EVENTS)
        .then(toys => {})
        .catch(err => {
          console.log('err in load events');
        });
    },
    openSelectedEvent(event) {
      this.$router.push(`event/${event._id}`);
    }
  }
};
</script>
