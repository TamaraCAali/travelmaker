import StorageService from '@/services/StorageService.js';
const STORAGE_KEY = 'loggedinUser';
var loggedinUser = StorageService.loadFromStorage(STORAGE_KEY) || null;

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
  getById,
  login,
  logout,
  getLoggedInUser
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
  console.log('serve', user);
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

function login(user) {
  return axios.post(USER_URL + '/setUser', user).then(res => {
    _setLoggedinUser(res.data);
    return res.data;
  });
}

function logout() {
  StorageService.clearStorage(STORAGE_KEY);
}

function getLoggedInUser() {
  return loggedinUser;
}

function _setLoggedinUser(user) {
  loggedinUser = user;
  StorageService.saveToStorage(STORAGE_KEY, loggedinUser);
}

// function getEmptyuser() {
//     return {
//         txt: '',
//         isDone: false
//     }
// }
