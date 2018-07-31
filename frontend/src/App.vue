<template>
  <div id="app">
    <nav v-show="!userToChat">
      <div>
        <router-link class="router-link" to="/login"><i class="fas fa-sign-in-alt"></i> <span @click="logout" class="span-icon"> {{login}}</span></router-link> |
        <router-link class="router-link" to="/"><i class="fas fa-calendar-alt"></i> <span class="span-icon"> events</span></router-link> |
        <router-link class="router-link" to="/travelers"><i class="fas fa-user-friends"></i> <span class="span-icon"> travelers</span></router-link>|
      </div>
      <div class="logo">
        <i class="fas fa-walking"></i>
        <i class="fas fa-search"></i>
        TravelMaker
        </div>
        <div>
        <router-link class="router-link" to="/user/edit/:userId"><i class="fas fa-cog"></i><span class="span-icon"></span>
        <img class="login-img" :src="userUrl"></router-link></div>
    </nav>
    <user-msg></user-msg>
    <router-view v-show="!userToChat"/>
    <ChatWindow v-if="userToChat" :otherUser="userToChat" />
  </div>
</template>

<script>
import moment from 'moment';
import ChatWindow from '@/components/ChatWindow.vue';
import UserMsg from '@/components/UserMsg.vue';
import EventBusService, {
  SHOW_MSG,
  LOGIN,
  TOGGLE_CHAT
} from './services/eventBusService.js';
import { LOGOUT } from './store.js';

import userService from '@/services/userService';

export default {
  name: 'app',
  components: {
    ChatWindow,
    UserMsg
  },
  data() {
    return {
      login: null,
      userUrl: userService.getLoggedInUserUrl(),
      userToChat: null
    };
  },
  created() {
    EventBusService.$on(SHOW_MSG, username => {
      this.loadLogStatus();
    });
    EventBusService.$on(LOGIN, userImg => {
      this.userUrl = userImg;
      //get from localstorage of user
    });
    EventBusService.$on(TOGGLE_CHAT, user => {
      console.log('emit happens!', user)
      this.userToChat = user;
    });
    this.loadLogStatus();
  },
  methods: {
    loadLogStatus() {
      userService.getLoggedInUser()
        ? (this.login = 'logout')
        : (this.login = 'login');
    },
    logout() {
      this.login = 'login';
      this.userUrl =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjvdv8INW6OzjzPL8JyQlDbYOxZjabXx8xcNlhroqSHOMZh4C35g';
      this.$store.dispatch(LOGOUT);
    }
  }
};
</script>



<style  lang="scss">
nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #41b883;
}
.router-link i {
  color: #35495e;
}

.fa-search:before {
  color: #35495e;
}

.logo {
  font-family: Pacifico;
  font-size: 1.4em;
}

.logo i {
  color: #35495e;
}

.logo .fa-walking {
  font-size: 0.4em;
  position: relative;
  bottom: 7px;
  left: 12px;
}

.logo .fa-search {
  // outline: 1px solid blue;
  // margin: 0 2px;
  transition: 0.5s ease-in-out;
}

.logo:hover .fa-search {
  transform-origin: 37% 33%;
  transform: rotate(-360deg);
}

.router-link {
  font-size: 1.2em;
  transition: all 0.3s;
}

.router-link:hover {
  font-size: 1.5em;
  color: #41b883;
}
.router-link:active {
  font-weight: bold;
  font-size: 1.5em;
  color: #41b883;
}

.router-link:visited {
  color: #35495e;
}

.login-img {
  height: 30px;
  border-radius: 50%;
}
.span-icon {
  text-transform: capitalize;
}

@media only screen and (max-width: 420px) {
  .span-icon {
    display: none;
  }
}
</style>
