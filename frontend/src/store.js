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
export const FB_LOGIN = 'user/fb-login';
export const LOGOUT = 'user/logout';
export const SET_USER = 'user/setUser';
export const UPDATE_USER = 'user/updateLocUser';
export const ADD_USER = 'user/addUser';
// export const SET_GUEST = 'user/setGuest';

export default new Vuex.Store({
  state: {
    user: _loadUser(),
    searchedLoc: {}
  },
  mutations: {
    [LOAD_CURR_LOC](state, { currLoc }) {
      state.user.loc = currLoc;
      // console.log('LOAD_CURR_LOC', state.user);
    },
    [SEARCHED_LOC](state, { pos }) {
      state.searchedLoc = pos;
    },
    [SET_USER](state, { user }) {
      state.user = user;
      // console.log('SET_USER', state.user);
    }
  },
  getters: {
    getCurrLoc(state) {
      // console.log('inside getCurrLoc ');
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
      var currLoc = {};
      currLoc.type = 'Point';
      return locService
        .getPosition()
        .then(res => {
          currLoc.coordinates = [res.coords.latitude, res.coords.longitude];
          return locService.getAddressFromLoc(currLoc.coordinates);
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
      // console.log('store got:', searchInput);

      locService.getPositionByName(searchInput).then(pos => {
        // console.log('pos', pos);
        context.commit({
          type: SEARCHED_LOC,
          pos
        });
      });
    },
    [LOGIN](context, { user }) {
      debugger;
      return userService
        .login(user)
        .then(user => {
          // console.log('after login', user);
          return context.commit({ type: SET_USER, user });
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    [FB_LOGIN](context, { user }) {
      // console.log('store', user);
      return userService
        .fbLogin(user)
        .then(user => {
          // console.log('after fb login', user);
          return context.commit({ type: SET_USER, user });
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    [LOGOUT](context) {
      userService.logout();
      context.commit({ type: SET_USER, user: _loadUser() });
    },
    [UPDATE_USER](context, { user }) {
      // console.log('update', user);
      return userService.update(user).then();
    },
    [ADD_USER](context, { user }) {
      return _getAppLoc().then(loc => {
        user.loc = loc;
        return userService
          .add(user)
          .then(user => {
            console.log('return store then good username');
            return context.commit({
              type: SET_USER,
              user
            });
          })
          .catch(err => {
            console.log('service store err username');

            return Promise.reject(err);
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
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjvdv8INW6OzjzPL8JyQlDbYOxZjabXx8xcNlhroqSHOMZh4C35g',
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
      },
      chatNtfsMap: {},
      commentNtfsMap: {}
    };
}

function _getAppLoc() {
  var currLoc = {};
  currLoc.type = 'Point';
  return locService
    .getPosition()
    .then(res => {
      currLoc.coordinates = [res.coords.latitude, res.coords.longitude];
      return locService.getAddressFromLoc(currLoc.coordinates);
    })
    .then(name => {
      currLoc.name = name;
      return currLoc;
    });
}
