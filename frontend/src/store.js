import Vue from 'vue';
import Vuex from 'vuex';
import eventService from '@/services/eventService.js';
import locService from '@/services/locationService.js';

Vue.use(Vuex);

import userModule from '@/storeModules/userModule.js';
import eventModule from '@/storeModules/eventModule.js';
import chatModule from '@/storeModules/chatModule.js';
export const LOAD_CURR_LOC = 'getCurrLoc';
export const SEARCHED_LOC = 'getSearchesLoc';

export default new Vuex.Store({
  state: {
    user: {
      _id: '5b58aa7616f42101ded3362b',
      isActive: true,
      img: 'http://beragaminfo.com/wp-content/uploads/2017/09/These-Are-the-Photos-Your-Dating-Profile-Absolutely-Must-Have-According-to-Matchmakers.jpg',
      age: 24,
      name: {
        first: 'Bauer',
        last: 'Carroll'
      },
      email: 'bauer.carroll@gmail.com',
      about: {
        interests: [
          'sint',
          'id',
          'incididunt',
          'mollit',
          'duis'
        ],
        nextDest: 'pariatur',
        langs: [
          'EN',
          'HE',
          'IT'
        ],
        desc: 'Esse Lorem dolor sit id sunt. Tempor est qui veniam ex eiusmod veniam sint dolor nostrud ea veniam nostrud. Magna velit aute sit culpa. Magna laboris est elit do adipisicing ipsum minim.'
      },
      loc: {
        lat: '7.129296',
        lng: '-19.995148'
      },
      activity: {
        events: [
          '5b58ab1d16f42101ded33632',
          '5b58ab1d16f42101ded3362f'
        ],
        chatRooms: [
          '5b58a9df475b233765846fa6',
          '5b58a9dfbe451bc62271d784',
          '5b58a9dff3eeaea39dbab3e6',
          '5b58a9df90f9856e4675510e',
          '5b58a9df0a28256dda4df6a2'
        ]
      }
    },
    searchedLoc: {}
  },
  mutations: {
    [LOAD_CURR_LOC](state, { currLoc }) {
      state.user.currLoc = currLoc;
    },
    [SEARCHED_LOC](state, { pos }) {
      state.searchedLoc = pos;
    }
  },
  getters: {
    getCurrLoc(state) {
      return state.user.currLoc;
    },
    getUser(state) {
      return state.user
    }
  },
  actions: {
    [LOAD_CURR_LOC](context) {
      var currLoc;
      locService
        .getPosition()
        .then(res => {
          currLoc = {
            lat: res.coords.latitude,
            lng: res.coords.longitude
          };
          return locService.getAddressFromLoc(currLoc);
        })
        .then(name => {
          currLoc.name = name;
          context.commit({
            type: LOAD_CURR_LOC,
            currLoc
          });
        });
    },
    [SEARCHED_LOC](context, { searchInput }) {
      locService.getPositionByName(searchInput).then(pos => {
        context.commit({
          type: SEARCHED_LOC,
          pos
        });
      });
    }
  },
  modules: {
    userModule,
    eventModule,
    chatModule
  }
});
