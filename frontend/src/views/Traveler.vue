<template>
  <div class="about">
    <h1>This is an Travelers page</h1>
  </div>
</template>
<script>
// @ is an alias to /src

import { LOAD_USERS } from '../storeModules/eventModule.js';

export default {
  name: 'Event',
  components: {},
  data() {
    return {};
  },
  created() {
    this.loadUsers();
  },
  computed: {},
  methods: {
    loadUsers() {
      this.$store
        .dispatch(LOAD_USERS)
        .then()
        .catch(err => {
          console.log('err in load events');
        });
    }
  }
};
</script>
