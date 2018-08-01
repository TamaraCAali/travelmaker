<template>
  <div class="travelers">
    <TravelersList v-if="users" :users="users" v-on:selected="openSelectedUsers"></TravelersList>
  </div>
</template>

<script>
import locService from '@/services/locationService.js';
import TravelersList from '@/components/travelers/TravelersList.vue';
import { LOAD_USERS } from '../storeModules/userModule.js';

export default {
  name: 'travelers',
  components: { TravelersList },
  data() {
    return {
      user: null,
      users: null
    };
  },
  created() {
    this.loadUser();
  },
  computed: {
    // users() {
    //   return this.$store.getters.usersForDisplay;
    // }
  },
  methods: {
    loadUser() {
      this.user = this.$store.getters.loggedinUser;
      locService.getAppLoc().then(currLoc => {
        this.user.loc = currLoc;
        // console.log('user', this.user);
        this.loadUsers(this.user);
      });
    },
    loadUsers(user) {
      this.$store
        .dispatch(LOAD_USERS, { user })
        .then(users => {
          // console.log('users', users);
          this.users = users;
        })
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
  margin: 35px 0 10px 0;
}
</style>