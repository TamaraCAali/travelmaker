<template>
  <div id="app">
    <nav :class="[(userToChat)? 'desktop-only': 'mobile']">
      <div class="logo">
        <i class="fas fa-walking"></i>
        <i class="fas fa-search"></i>
        TravelMaker
      </div>
      <div class="links-nav">
        <router-link  class="router-link" to="/login">
          <i @click="logoutUser" class="fas fa-sign-in-alt"></i> 
          <span @click="logoutUser" class="span-icon"> 
            {{login}}
          </span>
        </router-link> |
        <router-link class="router-link" to="/"><i class="fas fa-calendar-alt"></i> <span class="span-icon"> events</span></router-link> |
        <router-link class="router-link" to="/travelers"><i class="fas fa-user-friends"></i> <span class="span-icon"> travelers</span></router-link>|
        <NotificationMenu/> |
        <router-link class="router-link" to="/user/profile">
          <i class="fas fa-cog"></i>
          <span class="span-icon"></span>
          <img class="login-img" :src="userUrl">
        </router-link>
      </div>

          
    </nav>
    <user-msg></user-msg>
    <router-view :class="[(userToChat)? 'desktop-only': 'mobile']"></router-view>
    <ChatWindow
      v-if="userToChat" 
      :otherUser="userToChat" 
    />
  </div>

</template>

<script>
// ***********LOGIN WITH FACEBOOK START*********************//

window.fbAsyncInit = function() {
  FB.init({
    appId: 433876200458410,
    cookie: true, // enable cookies to allow the server to access the session
    xfbml: true, // parse social plugins on this page
    version: 'v2.8' // use graph api version 2.8
  });
};
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

// ***********LOGIN WITH FACEBOOK END*********************//

import moment from 'moment';
import ChatWindow from '@/components/ChatWindow.vue';
import NotificationMenu from '@/components/NotificationMenu.vue';
import UserMsg from '@/components/UserMsg.vue';

import eventBusService, {
  PUSH_NOTIFICATION,
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
    UserMsg,
    NotificationMenu
  },
  data() {
    return {
      login: null,
      userUrl: userService.getLoggedInUserUrl(),
      userToChat: null
    };
  },
  created() {
    eventBusService.$on(SHOW_MSG, username => {
      this.loadLogStatus();
    });
    eventBusService.$on(LOGIN, userImg => {
      this.userUrl = userImg;
      console.log('this happened', this.userUrl);
      
      //get from localstorage of user
    });
    eventBusService.$on(TOGGLE_CHAT, user => {
      console.log('emit happens!', user);
      this.userToChat = user;
    });
    this.loadLogStatus();
  },
  sockets: {
    renderPushNtf(pushNtf) {
      console.log('renderPushNtf', pushNtf);
      eventBusService.$emit(PUSH_NOTIFICATION, pushNtf);
    }
  },
  methods: {
    loadLogStatus() {
      userService.getLoggedInUser()
        ? (this.login = 'logout')
        : (this.login = 'login');
    },
    logoutUser() {
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
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #41b883;
  position: fixed;
  z-index: 10;
  background-color: #f5f5f5b0;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.router-link {
  color: #35495e;
  margin: 0 1px;
  font-size: 1em;
  transition: all 0.3s;
  padding: 5px;
}

.router-link:hover {
  color: #41b883;
}

.router-link-exact-active {
  font-size: 1.2em;
  color: #41b883;
}

.fa-search:before {
  color: #41b883;
}

.logo {
  font-family: Pacifico;
  font-size: 1.6em;
}

.logo i {
  color: #41b883;
}

.logo .fa-walking {
  font-size: 0.5em;
  position: relative;
  bottom: 9px;
  left: 16px;
}

.logo .fa-search {
  // outline: 1px solid blue;
  // margin: 0 2px;
  font-size: 30px;
  transition: 0.5s ease-in-out;
}

.logo:hover .fa-search {
  transform-origin: 37% 33%;
  transform: rotate(-360deg);
}

.login-img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  object-fit: cover;
}

.span-icon {
  text-transform: capitalize;
}

.links-nav {
  display: flex;
  align-items: center;
}

@media only screen and (max-width: 630px) {
  .span-icon {
    display: none;
  }
}

@media only screen and (max-width: 440px) {
  .links-nav {
    position: fixed;
    bottom: 0;
    opacity: 0.85;
    width: 100%;
    background-color: #ccc;
    display: flex;
    justify-content: space-around;
    z-index: 10;
  }
  nav {
    padding: 0;
  }
}

@media only screen and (max-width: 700px) {
  .desktop-only {
    display: none;
  }
}
</style>
