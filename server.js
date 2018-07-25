const express = require('express')
var bodyParser = require('body-parser')

const carService = require('./services/car-service')
const app = express()
app.use(express.static('dist'));




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port} !`)
}); 
