<template>
  <section class = "travelers-list">
      <div>
   <slot name="header"></slot>
    <carousel :perPageCustom="[[0, 1],[400, 2],[600, 3],[768, 4], [900, 5]]">
        <slide v-for="user in users" 
            :key="user._id" v-if="$store.getters.loggedinUser._id !== user._id" >
              <TravelersPreview  :user="user" ></TravelersPreview>
    </slide>
    </carousel>
  </div>
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
  font-family: BreeSerif;
  margin: 10px 0;
}
</style>
