<template>
  <div class="travelers">
    <h3>look who's around you..</h3>
    <TravelersList :users="users" v-on:selected="openSelectedUsers"></TravelersList>
  </div>
</template>

<script>
import TravelersList from '@/components/travelers/TravelersList.vue';
import { LOAD_USERS } from '../storeModules/userModule.js';

export default {
  name: 'travelers',
  components: { TravelersList },
  data() {
    return {};
  },
  created() {
    this.loadUsers();
  },
  computed: {
    users() {
      return this.$store.getters.usersForDisplay;
    }
  },
  methods: {
    loadUsers() {
      this.$store
        .dispatch(LOAD_USERS)
        .then()
        .catch(err => {
          console.log('err in load users');
        });
    },
    openSelectedUsers(user) {
      console.log(user, `user/${user._id}`);

      this.$router.push(`user/${user._id}`);
    }
  }
};
</script>   

<style scoped lang="scss">
h3 {
  text-align: center;
}
</style>