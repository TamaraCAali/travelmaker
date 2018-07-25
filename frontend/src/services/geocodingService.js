const API_KEY = 'AIzaSyAGe5rJsXIvHdSmy3Sm3PIdj1Tsn1g77nE'
const axios = require('axios')


export default {
    getAddressFromLoc
}

function getAddressFromLoc(loc) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.lat},${loc.lng}&key=${API_KEY}`)
        .then(res => res.data.formatted_address)
}
