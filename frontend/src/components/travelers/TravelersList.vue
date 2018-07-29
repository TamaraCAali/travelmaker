<template>
  <div>
   <h1 style="text-align: center;"> Hello {{$store.getters.loggedinUser.userName}}</h1>
    <section class="travelers-list" v-if="!userToChat"> 
    <TravelersPreview v-for="user in users" :key="user._id" :user="user" v-on:selected="openSelectedUsers"></TravelersPreview>
    </section>
    bla bla
    <ChatWindow 
    v-if="userToChat"
    :otherUser="userToChat"
    />
  </div>
</template>

<script>
import TravelersPreview from '@/components/travelers/TravelersPreview.vue';
import ChatWindow from '@/components/ChatWindow.vue';

export default {
  name: 'TravelerstList',
  components: {
    TravelersPreview,
    ChatWindow
  },
  props: {
    users: Array,
  },
  data(){
    return{
      
      userToChat: null,
      isChatMode: false
    }
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
