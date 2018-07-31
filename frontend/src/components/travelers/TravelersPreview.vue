<template>
  <section class="user-preview"
  v-if="$store.getters.loggedinUser._id !== user._id"
  >
      <div class="user" @click="openUserDetails">
          <div class="user-img" :style="'background-image: url('+user.img+')'">
          </div>
          <div class="user-pre-details">
            <div class="bold">{{user.name.first}},  {{user.age}} <span class="dist"> {{dist}}  away</span></div>
              <div class="langs">
                <langs v-for="langs in user.about.langs" :key="langs" :langs="langs"></langs>
                <button class="chat-icon" @click.stop="toggleChat">
                    <i class="far fa-comments"></i>
                </button>
            </div>
          </div>
      </div>
  </section>
</template>
<script>
import moment from 'moment';
import locService from '@/services/locationService.js';
import langs from '@/components/travelers/langs.vue';
import eventBusService, {
  TOGGLE_CHAT
} from '@/services/eventBusService';
export default {
  name: 'UserPreview',
  props: {
    user: Object
  },
  components: {
    langs
  },
  computed: {
<<<<<<< HEAD
    dist() {
      const userLoc = this.$store.getters.getCurrLoc;

      const dist = locService.getDistance(userLoc, this.user.loc).toFixed();
=======
    dist: function() {
      const userLoc = this.$store.getters.getCurrLoc.coordinates;
      const dist = locService
        .getDistance(userLoc, this.user.loc.coordinates)
        .toFixed();
>>>>>>> master
      if (dist < 1) return dist + ' m';
      else return dist + ' km';
      return dist;
    }
  },
  methods: {
    openUserDetails() {
      this.$emit('selected', this.user);
    },
    toggleChat() {
      const loggedUser = this.$store.getters.getUser;
      if (loggedUser._id) {
        // this.$parent.userToChat = { ...this.user };
        eventBusService.$emit(TOGGLE_CHAT, this.user)
      } else {

        this.$message.error('Please login to contact other people');
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style scoped lang="scss">
.user-preview {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 250px;
}
.user {
  width: 100%;
  background-color: #f5f5dc;
  box-shadow: 0 0 5px #00000063;
  margin: 5px;
  transition: all 0.3s;
  cursor: pointer;
}
.user-img {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 150px;
  // background-image: url('../assets/img/maxresdefault.jpg');
  background: linear-gradient(rgba(0, 0, 0, 0.21), rgba(0, 0, 0, 0.35)),
    url(/img/maxresdefault.28e174ef.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  padding: 10px;
  transition: all 1s ease;
  opacity: 0.8;
  background-position: center;
}
.user-img:hover {
  opacity: 1;
  transition: 1s ease;
}

.user-pre-details {
  padding: 5px 10px;
  margin: 5px 0;
  font-size: 0.9em;
}

.user-img p {
  color: whitesmoke;
}
h4 {
  padding: 2px;
  margin: 2px;
}
.dist {
  float: right;
}
.chat-icon {
  text-align: center;
  cursor: pointer;
  float: right;
  border: none;
  color: #35495e;
  background-color: transparent;
}

.fa-comments:before {
  font-size: 2em;
}
.bold {
  font-weight: bold;
  padding: 5px 0;
}

@media only screen and (max-width: 920px) {
  .user-preview {
    width: 32%;
  }
}

@media only screen and (max-width: 760px) {
  .user-preview {
    width: 45%;
  }
}

@media only screen and (max-width: 500px) {
  .user-preview {
    width: 96%;
  }
}
</style>
