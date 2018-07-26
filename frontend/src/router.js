import Vue from 'vue';
import Router from 'vue-router';
import EventDetails from './views/EventDetails.vue';
import EventEditAdd from './views/EventEditAdd.vue'
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
    }
  ]
});
