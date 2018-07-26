const API_KEY = 'AIzaSyAGe5rJsXIvHdSmy3Sm3PIdj1Tsn1g77nE';
const axios = require('axios');

export default {
  getAddressFromLoc,
  getPosition,
  getPositionByName
};

function getAddressFromLoc(loc) {
  // console.log('service got loc:', loc);
  return axios
    .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.lat},${loc.lng}&key=${API_KEY}`,
      {
        withCredentials: false
      })
    .then(res => {
      // console.log('service got res:', res);
      return res.data.results[0].formatted_address
    })
}

function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function getPositionByName(cityName) {
  var prm = axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=AIzaSyArwZLwu8qpwO8J1vkedj-qYnK7mdLmhYE`
  );
  return prm.then(res => {
    var loc = res.data.results[0].geometry.location;
    loc.address = res.data.results[0].formatted_address;
    return loc;
  });
}
