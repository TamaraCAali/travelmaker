import Vue from 'vue';
import Vuex from 'vuex';
import eventService from '@/services/eventService.js';
import geoService from '@/services/geocodingService.js';

Vue.use(Vuex);

import userModule from '@/storeModules/userModule.js';
import eventModule from '@/storeModules/eventModule.js';
import chatModule from '@/storeModules/chatModule.js';
export const LOAD_CURR_LOC = 'getCurrLoc';
export const SEARCHED_LOC = 'getSearchesLoc';

export default new Vuex.Store({
  state: {
    user: {
      name: 'puki',
      currLoc: {}
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
    }
  },
  actions: {
    [LOAD_CURR_LOC](context) {
      var currLoc;
      geoService
        .getPosition()
        .then(res => {
          currLoc = {
            lat: res.coords.latitude,
            lng: res.coords.longitude
          };
          return geoService.getAddressFromLoc(currLoc);
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
      geoService.getPositionByName(searchInput).then(pos => {
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
