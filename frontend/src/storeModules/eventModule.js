import eventService from '@/services/eventService';
export const LOAD_EVENTS_BY_LOC = 'event/loadByLoc'
export const LOAD_EVENTS = 'event/load';
export const LOAD_EVENT = 'event/loadById';
export const REMOVE_EVENT = 'event/remove';
export const SET_RADIUS = 'event/set-radius';
export const SET_FILTER = 'event/set-filter'
// export const REMOVE_USER = 'user/removeUser'

// Getters
export const GET_FILTERED_USERS = 'user/getters/filteredUsers';
export const GET_USER = 'toy/getters/getToyById';

export default {
  state: {
    events: [],
    filterBy: null,
    radius: 500000
  },
  mutations: {
    [LOAD_EVENTS](state, { events }) {
      state.events = events;
      return events;
    },
    [REMOVE_EVENT](state, { eventId }) {
      state.events = state.events.filter(event => event._id !== eventId);
    },
    [SET_RADIUS](state, { radius }) {
      state.radius = radius;
    },
    [SET_FILTER](state, { filterBy }) {
      state.filterBy = filterBy;
    }
  },
  getters: {
    eventForDisplay(state) {
      let events = state.events;
      // console.log('store all events:', events);
      
      if (state.filterBy && state.filterBy.txt) {
        events = events.filter(event =>
          event.name.toLowerCase().includes(state.filterBy.txt.toLowerCase()) ||
          event.desc.toLowerCase().includes(state.filterBy.txt.toLowerCase()) ||
          event.tags.some(item => item.toLowerCase().includes(state.filterBy.txt.toLowerCase()))
        );
      }
      // console.log('store events4display:', events);
      return events
    },
    eventsRadius(state) {
      return state.radius
    }
  },
  actions: {
    [LOAD_EVENTS](context, { user }) {
      return eventService.queryByRange(user.loc.coordinates, context.state.radius).then(events => {
        context.commit({
          type: LOAD_EVENTS,
          events
        });
        return events;
      });
    },
    [LOAD_EVENTS_BY_LOC](context, { loc }) {
      return eventService.queryByRange(loc).then(events => {
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
    },
    [SET_RADIUS](context, { radius }) {
      return context.commit({
        type: SET_RADIUS,
        radius
      });
    },
    [SET_FILTER](context, { filterBy }) {
      return context.commit({
        type: SET_FILTER,
        filterBy
      });
    },
  }
};
