import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './assets/scss/main.scss';

import axios from 'axios';
axios.defaults.withCredentials = true;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Datetime from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
Vue.use(Datetime);

import VueSocketio from 'vue-socket.io';
const SOCKET_URL =
  process.env.NODE_ENV !== 'development'
    ? '/'
    : '//localhost:3000';
console.log('SOCKETURL', SOCKET_URL)
Vue.use(VueSocketio, SOCKET_URL);

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import FBSignInButton from 'vue-facebook-signin-button';
Vue.use(FBSignInButton);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
