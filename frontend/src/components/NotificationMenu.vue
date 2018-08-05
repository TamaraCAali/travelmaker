<template>
    <section class="notification-menu">
      <h3>Notifications:</h3>
      <!-- <pre v-if="user.chatNtfsMap">
        {{user.chatNtfsMap}}
      </pre> -->
       <div class="chat-ntfs" 
        v-for="(value, key) in user.chatNtfsMap" 
        :key="key" 
        v-if="user.chatNtfsMap">
            <!-- <pre>
              {{key}}:{{value}}
            </pre> -->
            <div>
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
            <router-link :to="'/event/'+ user.cmntNtfsMap[key]">
              <div>
                  {{user.cmntNtfsMap[key][0].creatorName}}
                    commented on an event you're going to.
              </div>
            </router-link>
        </div>
    </section>  
</template>

<script>
import eventBusService, {
  TOGGLE_CHAT,
} from '@/services/eventBusService';
export default {
  data() {
    return {
      user: {}
    };
  },
  created() {
    //get user from server.
    this.user = this.$store.getters.loggedinUser;
    // this.user.chatNtfsMap = {bobo:23}
    console.log('Notification Menu for User: ', this.user);
  }
};
</script>


<style lang="scss" scoped>
.notification-menu {
  color: white;
  background: darkblue;
}
</style>
