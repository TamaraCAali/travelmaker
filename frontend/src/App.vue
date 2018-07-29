<template>
  <div id="app">
    <nav>
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
        <router-link class="router-link" to="/user/edit/:userId"><i class="fas fa-users-cog"></i><span class="span-icon"></span></router-link>
    </nav>
    <user-msg></user-msg>
    <router-view/>
  </div>
</template>

<script>
import moment from 'moment';
import ChatWindow from '@/components/ChatWindow.vue';
import UserMsg from '@/components/UserMsg.vue';
import EventBusService, {
  LOGIN_USER,
  LOGOT_USER,
  SHOW_MSG
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
    return { login: null };
  },
  created() {
    EventBusService.$on(SHOW_MSG, username => {
      this.loadLogstatus();
    });
    this.loadLogstatus();
  },
  methods: {
    loadLogstatus() {
      userService.getLoggedInUser()
        ? (this.login = 'logout')
        : (this.login = 'login');
    },
    logout() {
      this.login = 'login';
      this.$store.dispatch(LOGOUT);
    }
  }
};
</script>



<style  lang="scss">
nav {
  display: flex;
  justify-content: space-around;
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
  transition: 0.5s ease-in-out
}

.logo:hover .fa-search {
  transform-origin: 37% 33%;
  transform: rotate(-360deg)
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

@media only screen and (max-width: 420px) {
  .span-icon {
    display: none;
  }
}
</style>
