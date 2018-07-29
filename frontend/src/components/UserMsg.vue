<template>
  <div class="user-mag">
       <div v-if="alive" class="alert" :class="alertClass" >
        {{msg.txt}}
    </div>
  </div>
</template>

<script>
import EventBusService, { SHOW_MSG } from '../services/eventBusService.js';

export default {
  name: 'UserMag',
  created() {
    EventBusService.$on(SHOW_MSG, msg => {
      this.msg = msg;
      var delay = msg.delay || 2000;
      this.alive = true;
      setTimeout(() => {
        this.alive = false;
      }, delay);
    });
  },
  data() {
    return {
      alive: false,
      msg: null
    };
  },
  computed: {
    alertClass() {
      if (!this.msg) return;
      return `alert-${this.msg.type}`;
    }
  }
};
</script>

<style scoped lang="scss">
.alert {
  color: white;
  padding: 10px;
  font-size: 1.4em;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: grey;
  border-radius: 5px;
}
.alert-success {
  background-color: rgba(65, 184, 131, 0.5);
}
.alert-danger {
  background-color: rgb(122, 11, 11);
}
</style>
