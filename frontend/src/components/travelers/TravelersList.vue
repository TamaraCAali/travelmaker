<template>
  <section class = "travelers-list">
        <h3 v-if="!userToChat">Look who's around you</h3>
        <div class="list-container" v-if="!userToChat"> 
          <TravelersPreview 
            v-for="user in users" 
            :key="user._id" 
            :user="user" 
            ></TravelersPreview>
        </div>
        <!-- <ChatWindow 
          v-if="userToChat"
          :otherUser="userToChat"
        /> -->
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
  methods: {}
};
</script>

<style scoped lang="scss">
h3 {
  font-size: 2rem;
  margin: 1.7em 0 0.5em 0;
  color: #41b883;
}

.list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

@media only screen and (max-width: 580px) {
  h3 {
    margin: 1.3em 0 0.5em 0;
  }
}
@media only screen and (max-width: 410px) {
  h3 {
    font-size: 1.6em;
    text-align: center;
  }
}

@media only screen and (max-width: 340px) {
  h3 {
    font-size: 1.3em;
  }
}

@media screen and (max-width: 470px) {
  .list-container {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
