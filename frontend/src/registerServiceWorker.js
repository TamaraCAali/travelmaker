/* eslint-disable no-console */

import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready(reg) {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      );
    },
    registered(registration) {
      // console.log(self);
      // console.log({ registration });
      // console.log(navigator.serviceWorker);
      // window.navigator.serviceWorker.addEventListener(
      //   'notificationclick',
      //   function(e) {
      //     console.log('in??');
      //     var notification = e.notification;
      //     var primaryKey = notification.data.primaryKey;
      //     var action = e.action;
      //     console.log({ action });
      //     if (action === 'close') {
      //       notification.close();
      //     } else {
      //       clients.openWindow('http://www.example.com');
      //       notification.close();
      //     }
      //   }
      // );
      // console.log(navigator.serviceWorker);
      // console.log('Service worker has been registered.');
    },

    cached() {
      console.log('Content has been cached for offline use.');
    },
    updated() {
      console.log('New content is available; please refresh.');
    },
    offline() {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    }
  });
}
