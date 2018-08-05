<template>
<div>
<slot name="header"></slot>
  <div class="event-list">
    <EventPreview v-for="event in events" :key="event._id" :event="event"></EventPreview>
  </div>
 

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
  methods: {}
};
</script>

<style scoped lang="scss">
h3 {
  font-family: BreeSerif;
}
.event-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
}

@media screen and (max-width: 720px) {
  .event-list {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
