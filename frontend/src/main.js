import axios from 'axios';
axios.defaults.withCredentials = true;

import './assets/scss/main.scss';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, '//localhost:3000', store);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

