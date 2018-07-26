<template>
  <div class="event-list">
    <!-- <EventPreview v-for="event in events" :key="event._id" :event="event" v-on:selected="openSelectedEvent"></EventPreview> -->
    <EventPreview v-on:selected="openSelectedEvent"></EventPreview>
   
  </div>
</template>

<script>
import EventPreview from '@/components/EventPreview.vue';

export default {
  name: 'EventList',
  components: {
    EventPreview
  },
  props: {
    events: Array
  },
  methods: {
    openSelectedEvent(event) {
      this.$emit('selected', event);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
