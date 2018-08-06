<template>
<div>

   <slot name="header"></slot>
    <carousel :perPageCustom="[[0, 1],[400, 2],[600, 3]]" :autoplay="true" :autoplayHoverPause="true">
        <slide v-for="event in events" :key="event._id">
    <EventPreview :event="event"></EventPreview>
    </slide>
    </carousel>

  </div>
</template>

<script>
import EventPreview from '@/components/EventPreview.vue';

export default {
  name: 'EventListCarousel',
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
  margin: 10px 0;
}
</style>
