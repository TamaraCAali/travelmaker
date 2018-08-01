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

import eventBusService, { PUSH_NOTIFICATION } from '@/services/eventBusService';


Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.applyNotifications();
    this.displayNotification();
    eventBusService.$on(PUSH_NOTIFICATION, ({ title, options }) => {
      this.displayNotification(title, options);
    })
  },
  methods: {
    applyNotifications() {
      Notification.requestPermission(function (status) {
        console.log('Notification permission status:', status);
      });
    },
    displayNotification(title='Hello world!', options = {
      body: 'Here is a notification body!',
      icon: 'data:image/png;base64,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',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore', title: 'Explore this new world',
          icon: 'images/checkmark.png'
        },
        {
          action: 'close', title: 'Close notification',
          icon: 'images/xmark.png'
        },
      ]
    }) {
      if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then((reg) => {
          reg.showNotification(title, options);
        });
      }
    }
  }
}).$mount('#app');
