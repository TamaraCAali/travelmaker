import axios from 'axios';

const CHAT_URL =
  process.env.NODE_ENV !== 'development'
    ? '/data/chat'
    : 'http://localhost:3000/data/chat';

export default {
  query,
  add,
  remove,
  update,
  getByRoom
};

function query() {
  return axios.get(CHAT_URL).then(res => res.data);
}

function add(chat) {
  return axios.post(CHAT_URL, chat).then(res => res.data);
}

function remove(room) {
  return axios.delete(`${CHAT_URL}/${room}`);
}

function update(chat) {
  return axios
    .put(`${CHAT_URL}/${room}`, chat)
    .then(res => res.data)
    .catch(err => {
      console.warn(err);
      return Promise.reject(err);
    });
}

function getByRoom(room) {
  return axios.get(`${CHAT_URL}/${room}`).then(res => res.data);
}

// function getEmptyEvent() {
//     return {
//         txt: '',
//         isDone: false
//     }
// }
