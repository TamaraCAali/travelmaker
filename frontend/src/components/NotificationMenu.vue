<template>
    <section>
      <h3>Notifications:</h3>
      <pre v-if="user.chatNtfsMap">
        {{user.chatNtfsMap}}
      </pre>
    </section>  
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.user = this.$store.getters.loggedinUser;
    // this.user.chatNtfsMap = {bobo:23}
    console.log('Notification Menu User: ', this.user);
  }
};
</script>


<style lang="scss" scoped>
</style>
