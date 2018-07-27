import Vue from 'vue';
import Vuex from 'vuex';
import eventService from '@/services/eventService.js';
import locService from '@/services/locationService.js';
import userService from '@/services/userService';

Vue.use(Vuex);

import userModule from '@/storeModules/userModule.js';
import eventModule from '@/storeModules/eventModule.js';
import chatModule from '@/storeModules/chatModule.js';
export const LOAD_CURR_LOC = 'getCurrLoc';
export const SEARCHED_LOC = 'getSearchesLoc';
export const LOGIN = 'user/login';
export const LOGOUT = 'user/logout';
export const SET_USER = 'user/setUser';
export const UPDATE_USER = 'user/updateLocUser';

export default new Vuex.Store({
  state: {
    user: userService.getLoggedInUser() || {
      _id: null,
      nickname: '',
      isAdmin: false
    },
    searchedLoc: {}
  },
  mutations: {
    [LOAD_CURR_LOC](state, { currLoc }) {
      state.user.loc = currLoc;
      console.log('LOAD_CURR_LOC', state.user);
    },
    [SEARCHED_LOC](state, { pos }) {
      state.searchedLoc = pos;
    },
    [SET_USER](state, { user }) {
      state.user = user;
      console.log('SET_USER', state.user);
    }
  },
  getters: {
    getCurrLoc(state) {
      return state.user.loc;
    },
    getUser(state) {
      return state.user;
    },
    loggedinUser(state) {
      return state.user;
    }
  },
  actions: {
    [LOAD_CURR_LOC](context) {
      var currLoc;
      return locService
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
        console.log('pos', pos);
        context.commit({
          type: SEARCHED_LOC,
          pos
        });
      });
    },
    [LOGIN](context, { user }) {
      return userService.login(user).then(user => {
        return context.commit({ type: SET_USER, user });
      });
    },
    [LOGOUT](context) {
      return userService.logout();
      then(() => {
        return context.commit({ type: SET_USER, user: null });
      });
    },
    [UPDATE_USER](context, { user }) {
      console.log('update', user);
      return userService.update(user).then();
    }
  },
  modules: {
    userModule,
    eventModule,
    chatModule
  }
});
