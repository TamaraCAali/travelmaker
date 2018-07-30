<template>
    <transition name="fade">
        <div class="modal-backdrop" @click.self="$emit('close-list')">
            <section class="modal">
                Have joined this event:
                <div class="attends-list">
                  <div class="user-card" v-for="user in users" :key="user._id">

                    <div class="user-img" :style="'background-image: url('+user.img+')'"
                      @click.prevent="openUser(user)">
                    </div>
                    <div class="user-pre-details">
                      <div class="bold">{{user.name.first}}, {{user.age}} 
                      </div>
                    </div>

                  </div>
                </div>
            </section>
        </div>
    </transition>
</template>

<script>
import userService from '@/services/userService';
import TravelersPreview from '@/components/travelers/TravelersPreview.vue';

export default {
  name: 'attends-list-cmp',
  props: ['usersIds'],
  components: {
    TravelersPreview
  },
  data() {
    return {
      users: []
    }
  },
  created() {
    let userPrms = this.usersIds.map(userId => userService.getById(userId))
    Promise.all(userPrms)
    .then(results => {
      this.users = results
      console.log('users:', this.users);
    })
  },

  methods: {
    openUser(user) {
      this.$router.push(`/user/${user._id}`);
    },
  }
}
</script>

<style>
.modal-backdrop {
  z-index: 2;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  color: #000000;
  padding: 2em;
  box-shadow: 6px 6px 20px -3px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;
  margin: 5em;
}

.fade-enter-active, .fade-leave-active {
    transition: .5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

.attends-list {
  display: flex;
  flex-wrap: wrap;
  color: #35495e;
  justify-content: space-evenly;
}

.user-card {
  margin: 0.5em;
  width: 115px;
}

.user-img {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 110px;
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
</style>
