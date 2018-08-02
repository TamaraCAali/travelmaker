<template>
  <section class="user-preview"
  v-if="$store.getters.loggedinUser._id !== user._id">
      <div class="user" @click="openUserDetails">
          <div class="user-img" :style="'background-image: url('+user.img+')'">
          </div>
          <div class="user-pre-details">
              <div class="bold">{{user.name.first}} {{user.name.last}},  {{user.age}}</div>
              <div class="away">
                <span class="dist"> {{dist}}  away</span>
                <button class="chat-icon" @click.stop="toggleChat"><i class="far fa-comments"></i></button>
              </div>
              <div class="langs">
                <langs v-for="langs in user.about.langs" :key="langs" :langs="langs"></langs>
            </div>
          </div>
      </div>
  </section>
</template>
<script>
import moment from 'moment';
import locService from '@/services/locationService.js';
import langs from '@/components/travelers/langs.vue';
import eventBusService, { TOGGLE_CHAT } from '@/services/eventBusService';
export default {
  name: 'UserPreview',
  props: {
    user: Object
  },
  components: {
    langs
  },
  computed: {
    dist() {
      const userLoc = this.$store.getters.getCurrLoc.coordinates;
      const dist = locService
        .getDistance(userLoc, this.user.loc.coordinates)
        .toFixed();
      if (dist < 1) return dist + ' m';
      else return dist + ' km';
      return dist;
    }
  },
  methods: {
    openUserDetails() {
      this.$router.push(`user/${this.user._id}`);
    },
    toggleChat() {
      const loggedUser = this.$store.getters.getUser;
      if (loggedUser._id) {
        // this.$parent.userToChat = { ...this.user };
        eventBusService.$emit(TOGGLE_CHAT, this.user);
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
  width: 100%;
}
.user {
  width: 100%;
  transition: all 0.3s;
  cursor: pointer;
  border: 1px solid #ccc;
  margin: 0 0 5px 0;
}

.user-img {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 150px;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 1s ease;
  background-position: center, center;
  transition: all 1s ease;
}
.user-img:hover {
  transition: 1s ease;
}

.user-pre-details {
  padding: 3px 5px;
  margin: 5px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ccc;
}

.away {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fa-comments {
  font-size: 1.5em;
}

.fa-comments:hover {
  color: #41b883;
}
.bold {
  font-weight: bold;
}
</style>
