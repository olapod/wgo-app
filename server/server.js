const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');


const dataRoutes = require('./routes/Data.routes');
const userRoutes = require('./routes/User.routes');


const app = express();
const server = require('http').createServer(app);



// const io = require('socket.io')(server);
global.io = require('socket.io')(server);

const port = process.env.PORT || 3001;

const events = require('events');


app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(dataRoutes);
app.use(userRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
  });

// app.use(express.static(path.join(__dirname, 'public')));
// // app.use(express.static(path.join(__dirname, 'build')));
// app.use('/', express.static(path.join(__dirname, 'public')))
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

// app.use(session({
//     secret: 'foo',
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({
//       url : db,
//       // db : 'Data',
//       // collection : 'true'
//    })
// }));  


// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.get('/api/home', function(req, res) {
//   res.send('Welcome!');
// })

io.on('connection', function(socket) {
  const eventEmitter = new events.EventEmitter();
  eventEmitter.on("newEvent", (msg) => {
    console.log('Msg: ', msg.body)
      socket.emit("log", msg.body);
  });

  exports.emitter = eventEmitter;
});

server.listen(port, () => console.log(`Listening on port ${port}`));