<template>
  <div class="event-list">
    <p>event list</p>
    <!-- <EventPreview v-for="event in events" :key="event._id" :event="event"></EventPreview> -->
    <EventPreview></EventPreview>
   
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
  }
};
</script>

<style scoped lang="scss">
</style>
