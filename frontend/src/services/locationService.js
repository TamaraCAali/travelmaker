const API_KEY = 'AIzaSyAGe5rJsXIvHdSmy3Sm3PIdj1Tsn1g77nE';
const axios = require('axios');

export default {
  getAddressFromLoc,
  getPosition,
  getPositionByName,
  getDistance
};

function getAddressFromLoc(loc) {
  // console.log('service got loc:', loc);
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.lat},${
        loc.lng
      }&key=${API_KEY}`,
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
  var φ1 = (userLoc.lat * Math.PI) / 180;
  var φ2 = (diffLoc.lat * Math.PI) / 180;
  var Δφ = ((diffLoc.lat - userLoc.lat) * Math.PI) / 180;
  var Δλ = ((diffLoc.lng - userLoc.lng) * Math.PI) / 180;
  var a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  return d / 1000;
}
