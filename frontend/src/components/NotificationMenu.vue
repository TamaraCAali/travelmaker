<template>
    <section class="notification-menu">
      <div class="notifs-btn" @click="showNotifDrop = !showNotifDrop">
        <i :class="['fas fa-bell', notifsBtnClassObj]" ></i>
      </div>

      <div class="notifs-dropdown">

       <div class="chat-ntfs" 
        v-for="(value, key) in user.chatNtfsMap" 
        :key="key" 
        v-if="showNotifDrop && user.chatNtfsMap">
            <!-- <pre>
              {{key}}:{{value}}
            </pre> -->
              <div @click="openChat(user.chatNtfsMap[key][0].creator._id)" class="notif-item">
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
        v-if="showNotifDrop && user.cmntNtfsMap">
            <!-- <pre>
              {{key}}:{{value}}
            </pre> -->
            <a target="_blank" :href="'/#/event/'+ key">
              <div class="notif-item">
                  {{user.cmntNtfsMap[key][0].creatorName}}
                    commented on an event you're going to.
              </div>
            </a>
        </div>
      </div>
    </section>  
</template>

<script>
import eventBusService, { TOGGLE_CHAT } from '@/services/eventBusService';
import userService from '@/services/userService';
import { LOGOUT_HAPPENED, LOGIN } from '../services/eventBusService';

export default {
  data() {
    return {
      user: {},
      showNotifDrop: false
    };
  },
  created() {
    this.user = this.$store.getters.getUser;

    eventBusService.$on(LOGOUT_HAPPENED, _ => {
      this.user = {};
    });

    eventBusService.$on(LOGIN, _ => {
      this.user = this.$store.getters.getUser;
    });
  },
  methods: {
    openChat(creatorId) {
      userService.getById(creatorId).then(otherUser => {
        eventBusService.$emit(TOGGLE_CHAT, otherUser);
      });
    },
    isEmpty(obj) {
      let hasOwnProperty = Object.prototype.hasOwnProperty;

      if (obj == null) return true;
      if (obj.length > 0) return false;
      if (obj.length === 0) return true;
      if (typeof obj !== 'object') return true;
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
      }
      return true;
    }
  },
  computed: {
    notifsBtnClassObj() {
      return {
        'notifs-dot':
          !this.isEmpty(this.user.chatNtfsMap) ||
          !this.isEmpty(this.user.cmntNtfsMap)
      };
    }
  },
  sockets: {
    renderPushNtf() {
      console.log('Update Ntf Menu')
      userService.getById(this.user._id).then(user => (this.user = user));
    }
  }
};
</script>

<style lang="scss" scoped>
.notification-menu {
  color: #35495e;
  position: relative;
}

.notifs-btn {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  padding: 3px;
  height: 2.2em;
  width: 2.2em;
}

.notifs-dot::after {
  content: '•';
  color: red;
  position: relative;
  position: relative;
  bottom: 0.5em;
}

.notifs-dropdown {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: max-content;
  margin-top: 6px;
  right: 0;
  // right: calc(100% - 2.2em);
}

.notif-item {
  cursor: pointer;
  background-color: #ffffff;
  padding: 3px;
  margin-top: 1px;
  color: #35495e;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.notif-item:hover {
  background-color: #d4d4d4b0;
}

@media only screen and (max-width: 440px) {
  .notif-item {
    background-color: #41b883;
  }
}

@media only screen and (max-width: 440px) {
  .notifs-dropdown {
    bottom: calc(100% + 4px);
  }
}
</style>
