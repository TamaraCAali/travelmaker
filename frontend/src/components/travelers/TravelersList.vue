<template>
  <section class = "travelers-list">
        <h3 v-if="!userToChat">Look who's around you</h3>
        <section class="list-container" v-if="!userToChat"> 
          <TravelersPreview v-for="user in users" :key="user._id" :user="user" v-on:selected="openSelectedUsers"></TravelersPreview>
        </section>
        <ChatWindow 
        v-if="userToChat"
        :otherUser="userToChat"
        />
  </section>
</template>

<script>
import TravelersPreview from '@/components/travelers/TravelersPreview.vue';
import ChatWindow from '@/components/ChatWindow.vue';

export default {
  name: 'TravelersList',
  components: {
    TravelersPreview,
    ChatWindow
  },
  props: {
    users: Array
  },
  data() {
    return {
      userToChat: null,
      isChatMode: false
    };
  },
  methods: {
    openSelectedUsers(user) {
      this.$emit('selected', user);
    }
  }
};
</script>

<style scoped lang="scss">
h3 {
  text-align: center;
  font-size: 1.3rem;
  margin: 2em 0 0.5em 0;
}

.list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
