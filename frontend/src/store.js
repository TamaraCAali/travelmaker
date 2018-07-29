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
export const ADD_USER = 'user/addUser';
export const SET_GUEST = 'user/setGuest';

export default new Vuex.Store({
  state: {
    user: _loadUser(),
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
      console.log('store got:', searchInput);
      
      locService.getPositionByName(searchInput).then(pos => {
        console.log('pos', pos);
        context.commit({
          type: SEARCHED_LOC,
          pos
        });
      });
    },
    [LOGIN](context, { user }) {
      return userService
        .login(user)
        .then(user => {
          console.log('after login', user);
          return context.commit({ type: SET_USER, user });
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    [LOGOUT](context) {
      return userService.logout().then(() => {
        return context.commit({ type: SET_USER, user: null });
      });
    },
    [UPDATE_USER](context, { user }) {
      console.log('update', user);
      return userService.update(user).then();
    },
    [ADD_USER](context, { user }) {
      console.log(user);
      return _getAppLoc().then(loc => {
        user.loc = loc;
        console.log(user);

        return userService.add(user).then(user => {
          return context.commit({
            type: SET_USER,
            user
          });
        });
      });
    },
    [SET_GUEST](context) {
      var user = _loadUser();
      return _getAppLoc().then(loc => {
        user.loc = loc;
        console.log('SET_GUEST', user);
        userService.setGuestLonin(user);
        return context.commit({
          type: SET_USER,
          user
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

function _loadUser() {
  if (userService.getLoggedInUser()) return userService.getLoggedInUser();
  else
    return {
      password: '',
      userName: '',
      isActive: true,
      img:
        'https://cdn-images-1.medium.com/max/1600/1*l9eqA179Bw1QoMA8iwBvHw.png',
      age: null,
      name: {
        first: '',
        last: ''
      },
      email: '',
      about: {
        interests: [],
        nextDest: [],
        langs: [],
        desc: ''
      },
      activity: {
        events: [],
        chatRooms: []
      }
    };
}

function _getAppLoc() {
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
      return currLoc;
    });
}
