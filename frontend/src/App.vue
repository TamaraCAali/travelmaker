<template>
  <div id="app">
    <nav>
      <div>
        <router-link class="router-link" to="/"><i class="fas fa-calendar-alt"></i> <span> events</span></router-link> |
        <router-link class="router-link" to="/travelers"><i class="fas fa-user-friends"></i> <span> travelers</span></router-link>
      </div>
      <div class="logo">
        <i class="fas fa-walking"></i>
        <i class="fas fa-search"></i>
        TravelMaker
        </div>
    </nav>
    
    
    <router-view/>
    <ChatWindow/>
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



<style lang="scss">
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
  span {
    display: none;
  }
}
</style>
