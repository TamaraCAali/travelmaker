import Vue from 'vue';
import Router from 'vue-router';
import Event from './views/Event.vue';
import Traveler from './views/Traveler.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'event',
      component: Event
    },
    {
      path: '/traveler',
      name: 'traveler',
      component: Traveler
    }
  ]
});
