import StorageService from '@/services/StorageService.js';
const STORAGE_KEY = 'loggedinUser';
var loggedinUser = StorageService.loadFromStorage(STORAGE_KEY) || null;
import locService from '@/services/locationService.js';

import axios from 'axios';

const USER_URL =
  process.env.NODE_ENV !== 'development'
    ? '/data/user'
    : 'http://localhost:3000/data/user';

export default {
  query,
  queryByRange,
  add,
  remove,
  update,
  getById,
  login,
  fbLogin,
  logout,
  getLoggedInUser,
  // setGuestLonin,
  getLoggedInUserUrl
};

function query() {
  return axios.get(USER_URL).then(res => res.data);
}

function queryByRange(userLoc) {
  console.log('inside service users', userLoc);

  const loc = [userLoc[1], userLoc[0]];
  const range = 500000000000000000;
  return axios.post(USER_URL + '/range', { loc, range }).then(res => res.data);
}

function add(user) {
  return axios
    .post(USER_URL, user)
    .then(res => {
      console.log('service front  good username');
      _setLoggedinUser(res.data);
      return res.data;
    })
    .catch(err => {
      console.log('inside err', err);
      return Promise.reject('username alredy exist');
    });
}

function remove(userId) {
  return axios.delete(`${USER_URL}/${userId}`);
}

function update(user) {
  console.log('serve', user);

  _setLoggedinUser(user);

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
  return axios
    .post(USER_URL + '/setUser', user)
    .then(res => {
      console.log('inside then', res);
      var loggedUser = res.data;
      _setLoggedinUser(loggedUser);
      return loggedUser;
    })
    .catch(err => {
      console.log('inside err', err);
      return Promise.reject('wrong username or password');
    });
}

function fbLogin(user) {
  return axios
    .post(USER_URL + '/setFbUser', user)
    .then(res => {
      alert('stop', res, user);
      var loggedUser = res.data;
      log('loggedUser', loggedUser);
      _setLoggedinUser(loggedUser);
      return loggedUser;
    })
    .catch(err => {
      alert('inside catch');
      const newUser = {};
      newUser.FB_id = '' + 1 * user.id;
      // newUser.FB_id = '2323242';
      newUser.userName = user.name;
      newUser.img = user.picture.data.url;
      newUser.password = '';
      newUser.isActive = true;
      newUser.age = null;
      newUser.name = {
        first: '',
        last: ''
      };
      newUser.email = '';
      newUser.about = {
        interests: [],
        nextDest: [],
        langs: [],
        desc: ''
      };
      newUser.activity = {
        events: [],
        chatRooms: []
      };
      return _getAppLoc().then(loc => {
        newUser.loc = loc;
        console.log('inside err', err, newUser);
        return add(newUser).then(usre => usre);
      });
    });
}

function logout() {
  StorageService.clearStorage(STORAGE_KEY);
}

function getLoggedInUser() {
  return StorageService.loadFromStorage(STORAGE_KEY) || null;
}

function getLoggedInUserUrl() {
  var loggedUser = StorageService.loadFromStorage(STORAGE_KEY);
  if (loggedUser) return loggedUser.img;
  else
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjvdv8INW6OzjzPL8JyQlDbYOxZjabXx8xcNlhroqSHOMZh4C35g';
}

// function setGuestLonin(user) {
//   _setLoggedinUser(user);
// }

function _setLoggedinUser(user) {
  loggedinUser = user;
  StorageService.saveToStorage(STORAGE_KEY, loggedinUser);
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
// function getEmptyuser() {
//     return {
//         txt: '',
//         isDone: false
//     }
// }
