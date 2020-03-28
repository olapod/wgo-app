const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const User = require('./models/User.model');
// const Data = require('./models/Data.model');
// const withAuth = require('./middleware');
const path = require('path');
const cookieParser = require('cookie-parser');
var logger = require('./utils/logger');

const dataRoutes = require('./routes/Data.routes');
const userRoutes = require('./routes/User.routes');


const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const port = process.env.PORT || 5000;

io.on("connection", function (socket) {
   socket.on ('log', function (data) {
      socket.emit ('logs', data);
      console.log('Msg: ', data)
    });
});



// server.listen(3000, 'localhost');

// io.of('/log').on('connection', function(socket){
//   console.log('got a new log connection');

//   socket.on('log', function(data){
//     console.log('got log data');
//     console.log(data);
//   });
// });

// io.on('connection', function (socket) {
//   console.log('connected...');

//   socket.on('pong', function (data) {
//     console.log(data);
//   });

//   setTimeout(function() {
//     console.log("Saying hello");
//     socket.emit('ping', { message: 'Hello from server ' + Date.now() });

//   }, 1000);

// });

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(dataRoutes);
app.use(userRoutes);

// DB Config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
        )
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

  app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/home', function(req, res) {
  res.send('Welcome!');
})


server.listen(port, () => logger.info(`Listening on port ${port}`));