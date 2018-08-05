<template>
    <section class="notification-menu">
      <h3>Notifications:</h3>
      <!-- <pre v-if="user.chatNtfsMap">
        {{user.chatNtfsMap}}
        ---
        {{user.cmntNtfsMap}}
      </pre> -->
       <div class="chat-ntfs" 
        v-for="(value, key) in user.chatNtfsMap" 
        :key="key" 
        v-if="user.chatNtfsMap">
            <!-- <pre>
              {{key}}:{{value}}
            </pre> -->
              <div @click="openChat(user.chatNtfsMap[key][0].creator._id)">
                You have
                <span v-if="user.chatNtfsMap[key].length > 1">
                  {{user.chatNtfsMap[key].length}}
                  new messages
                </span>
                <span v-else> 1 new message</span>
                  From {{user.chatNtfsMap[key][0].creator.fullName}}.
              </div>

        </div>
       <div class="cmnt-ntfs" 
        v-for="(value, key) in user.cmntNtfsMap" 
        :key="key" 
        v-if="user.cmntNtfsMap">
            <!-- <pre>
              {{key}}:{{value}}
            </pre> -->
            <a target="_blank" :href="'/#/event/'+ key">
              <div>
                  {{user.cmntNtfsMap[key][0].creatorName}}
                    commented on an event you're going to.
              </div>
            </a>
        </div>
    </section>  
</template>

<script>
import eventBusService, { TOGGLE_CHAT } from '@/services/eventBusService';
import userService from '@/services/userService';

export default {
  data() {
    return {
      user: {}
    };
  },
  created() {
    //get user from server.
    let userId = this.$store.getters.loggedinUser._id;
    // this.user.chatNtfsMap = {bobo:23}
    userService.getById(userId).then(user => {
      this.user = user;
    });
  },
  methods: {
    openChat(creatorId) {
      userService.getById(creatorId).then(otherUser => {
        eventBusService.$emit(TOGGLE_CHAT, otherUser);
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.notification-menu {
  color: white;
  background: darkblue;
}
a {
  color: white;
}
</style>
