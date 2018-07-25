<template>
  <div class="event-preview">
    <p>event prev</p>
    <div class="event">
      <!-- <div>name:{{event.name}}</div>
      <div>date:{{event.date}}</div>
      <div>loc:{{event.loc}}</div>
      <div><i class="fas fa-user-friends"></i> {{event.attends}} people are attending</div> -->
    </div>
    <p>event:{{event}}</p>
  </div>
</template>

<script>
export default {
  name: 'EventPreview',
  props: {
    event: String
  }
};
</script>

<style scoped lang="scss">
.event {
  // background-image: url('assets/img/maxresdefault.jpg');
}
</style>
