<template>
  <div id="app">
    <nav>
      <div>
        <router-link class="router-link" to="/login"><i class="fas fa-sign-in-alt"></i> <span class="span-icon"> login</span></router-link> |
        <router-link class="router-link" to="/"><i class="fas fa-calendar-alt"></i> <span class="span-icon"> events</span></router-link> |
        <router-link class="router-link" to="/travelers"><i class="fas fa-user-friends"></i> <span class="span-icon"> travelers</span></router-link>
      </div>
      <div>TRAVEL <i class="fas fa-search"></i> MAKER</div>
    </nav>
    
    
    <router-view/>

    <ChatWindow v-show="!!!!false"/>
  </div>
</template>

<script>
import ChatWindow from '@/components/ChatWindow.vue';

export default {
  components: {
    ChatWindow
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

.fa-search:hover {
  font-size: 1.5em;
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
