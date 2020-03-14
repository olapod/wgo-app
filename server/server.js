const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const User = require('./models/User.model');
// const Data = require('./models/Data.model');
// const withAuth = require('./middleware');
const path = require('path');
const cookieParser = require('cookie-parser');

// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const secret = process.env.TOKEN_PASS;

const dataRoutes = require('./routes/Data.routes');
const userRoutes = require('./routes/User.routes');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(dataRoutes);
app.use(userRoutes);

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true
    }
        )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/home', function(req, res) {
  res.send('Welcome!');
});

app.listen(port, () => console.log(`Listening on port ${port}`));