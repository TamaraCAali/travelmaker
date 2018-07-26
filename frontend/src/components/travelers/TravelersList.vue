<template>
  <div class="travelers-list">
    <TravelersPreview v-for="user in users" :key="user._id" :user="user" v-on:selected="openSelectedUsers"></TravelersPreview>
  </div>
</template>

<script>
import TravelersPreview from '@/components/travelers/TravelersPreview.vue';

export default {
  name: 'TravelerstList',
  components: {
    TravelersPreview
  },
  props: {
    users: Array
  },
  methods: {
    openSelectedUsers(user) {
      this.$emit('selected', user);
    }
  }
};
</script>

<style scoped lang="scss">
.travelers-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
