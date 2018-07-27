import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import EventDetails from './views/EventDetails.vue';
import EventEditAdd from './views/EventEditAdd.vue';
import Event from './views/Event.vue';
import Travelers from './views/Travelers.vue';
import TravelerDetails from './views/TravelerDetails.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'event',
      component: Event
    },
    {
      path: '/travelers',
      name: 'travelers',
      component: Travelers
    },
    {
      path: '/event/:eventId',
      name: 'event-details',
      component: EventDetails
    },
    {
      path: '/event/edit/:eventId',
      name: 'event-edit',
      component: EventEditAdd
    },
    {
      path: '/user/:userId',
      name: 'user-details',
      component: TravelerDetails
    }
  ]
});
