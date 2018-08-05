// const API_KEY = 'AIzaSyAGe5rJsXIvHdSmy3Sm3PIdj1Tsn1g77nE';
const API_KEY = 'AIzaSyArwZLwu8qpwO8J1vkedj-qYnK7mdLmhYE';
const axios = require('axios');

export default {
  getAddressFromLoc,
  getPosition,
  getPositionByName,
  getDistance,
  getAppLoc
};

function getAddressFromLoc(loc) {
  // console.log('service got loc:', loc);
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc[0]},${loc[1]}&key=${API_KEY}`,
      {
        withCredentials: false
      }
    )
    .then(res => {
      // console.log('service got res:', res);
      return res.data.results[0].formatted_address;
    });
}

function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function getPositionByName(cityName) {
  var prm = axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=AIzaSyArwZLwu8qpwO8J1vkedj-qYnK7mdLmhYE`,
    {
      withCredentials: false
    }
  );
  return prm.then(res => {
    var loc = res.data.results[0].geometry.location;
    loc.address = res.data.results[0].formatted_address;
    return loc;
  });
}

function getDistance(userLoc, diffLoc) {
  var R = 6371e3; // metres
  var φ1 = (userLoc[0] * Math.PI) / 180;
  var φ2 = (diffLoc[0] * Math.PI) / 180;
  var Δφ = ((diffLoc[0] - userLoc[0]) * Math.PI) / 180;
  var Δλ = ((diffLoc[1] - userLoc[1]) * Math.PI) / 180;
  var a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  return d / 1000;
}

function getAppLoc() {
  var currLoc = {};
  currLoc.type = 'Point';
  return getPosition().then(res => {
    currLoc.coordinates = [res.coords.latitude, res.coords.longitude];
    return getAddressFromLoc(currLoc.coordinates).then(name => {
      currLoc.name = name;
      return currLoc;
    });
  });
}
