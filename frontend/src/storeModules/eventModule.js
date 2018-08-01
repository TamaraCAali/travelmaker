import eventService from '@/services/eventService';
export const LOAD_EVENTS = 'event/load';
export const LOAD_EVENT = 'event/loadById';
export const REMOVE_EVENT = 'event/remove';
// export const REMOVE_USER = 'user/removeUser'

// Getters
export const GET_FILTERED_USERS = 'user/getters/filteredUsers';
export const GET_USER = 'toy/getters/getToyById';

export default {
  state: {
    events: [],
    filterBy: null
  },
  mutations: {
    [LOAD_EVENTS](state, { events }) {
      state.events = events;
      return events;
    },
    [REMOVE_EVENT](state, { eventId }) {
      state.events = state.events.filter(event => event._id !== eventId);
    }
  },
  getters: {
    eventForDisplay(state) {
      return state.events;
      // return state.events.filter(event =>
      //   event.name.toLowerCase().includes(state.filterBy.txt.toLowerCase())
      // );
    }
  },
  actions: {
    [LOAD_EVENTS](context, { user }) {
      return eventService.queryByRange(user.loc.coordinates).then(events => {
        context.commit({
          type: LOAD_EVENTS,
          events
        });
        return events;
      });
    },
    [LOAD_EVENT](context, { eventId }) {
      return eventService.getById(eventId);
    },
    [REMOVE_EVENT](context, { eventId }) {
      return eventService.remove(eventId).then(_ =>
        context.commit({
          type: REMOVE_EVENT,
          eventId
        })
      );
    }
  }
};
