import axios from 'axios';

const EVENT_URL =
  process.env.NODE_ENV !== 'development'
    ? '/data/event'
    : 'http://localhost:3000/data/event';

export default {
  query,
  add,
  remove,
  update,
  getById
};

function query() {
  return axios.get(EVENT_URL).then(res => res.data);
}

function add(event) {
  return axios.post(EVENT_URL, event).then(res => res.data);
}

function remove(eventId) {
  return axios.delete(`${EVENT_URL}/${eventId}`);
}

function update(event) {
  return axios
    .put(`${EVENT_URL}/${event._id}`, event)
    .then(res => res.data)
    .catch(err => {
      console.warn(err);
      return Promise.reject(err);
    });
}

function getById(eventId) {
  console.log('eventID', eventId);
  return axios.get(`${EVENT_URL}/${eventId}`).then(res => res.data);
}

// function getEmptyEvent() {
//     return {
//         txt: '',
//         isDone: false
//     }
// }
