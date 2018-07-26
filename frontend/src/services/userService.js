import axios from 'axios';

const USER_URL =
  process.env.NODE_ENV !== 'development'
    ? '/data/user'
    : 'http://localhost:3000/data/user';

export default {
  query,
  add,
  remove,
  update,
  getById
};

function query() {
  return axios.get(USER_URL).then(res => res.data);
}

function add(user) {
  return axios.post(USER_URL, user).then(res => res.data);
}

function remove(userId) {
  return axios.delete(`${USER_URL}/${userId}`);
}

function update(user) {
  return axios
    .put(`${USER_URL}/${user._id}`, user)
    .then(res => res.data)
    .catch(err => {
      console.warn(err);
      return Promise.reject(err);
    });
}

function getById(userId) {
  return axios.get(`${USER_URL}/${userId}`).then(res => res.data);
}

// function getEmptyuser() {
//     return {
//         txt: '',
//         isDone: false
//     }
// }
