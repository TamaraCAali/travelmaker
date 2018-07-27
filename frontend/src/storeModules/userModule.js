import userService from '@/services/userService';
export const LOAD_USERS = 'user/loadUsers';
export const LOAD_USER = 'user/loadById';

// export const REMOVE_USER = 'user/removeUser'

// Getters
export const GET_FILTERED_USERS = 'user/getters/filteredUsers';
export const GET_USER = 'toy/getters/getToyById';

export default {
  state: {
    users: []
  },
  mutations: {
    [LOAD_USERS](state, { users }) {
      state.users = users;
      return users;
    }
  },
  getters: {
    usersForDisplay(state) {
      return state.users;
      // return state.events.filter(event =>
      //   event.name.toLowerCase().includes(state.filterBy.txt.toLowerCase())
      // );
    }
  },
  actions: {
    [LOAD_USERS](context) {
      return userService.query().then(users =>
        context.commit({
          type: LOAD_USERS,
          users
        })
      );
    }
  }
};
