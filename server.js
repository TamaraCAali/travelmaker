const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);


// const eventService = require('./routes/services/eventService')
app.use(bodyParser.json());
app.use(express.static('frontend/dist'));
app.use(
  cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
  })
);
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/baba', (req, res) => res.send('Hello Baba!'));

const eventRoute = require('./routes/eventRoute');
eventRoute(app);

const userRoute = require('./routes/userRoute');
userRoute(app);

const chatRoute = require('./routes/chatRoute')
chatRoute(app)

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`App listening on port ${port} !`);
});

const socketConnect = require('./routes/services/socketService')
socketConnect(io)
// io.on('connection', socket => {
//   console.log('Someone connected!!!!!@!!!!!')
//   socket.on('chatRequested', connected)
// })
