const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const Data = require('./models/Data');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');

require('dotenv').config();
const secret = process.env.TOKEN_PASS;

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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

app.get('/api/admin', withAuth, function(req, res) {
  res.send('The password is potato');
});

app.post('/api/register', function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
        error: 'Incorrect email or password'
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
            error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
            error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.get('/api/getData',  function(req, res) {
  Data.find({}, function(err, items){
    if(err){
        console.log("What the fuck? ", err);
        return
    }

    if(items.length == 0) {
        console.log("No record found")
        return
    }

    res.send(items);
})
})

// POST route to register a database summary

app.post('/api/data', function (req, res, next) {
  const array = [{street: 'ul. Nowaka', number: 1, declaration: 1, residence: 2, difference: -1},
  {street: 'ul. Nowakj', number: 1, declaration: 1, residence: 4, difference: -3}]

    var payload = req.body;

    (async function(){

        const insertMany = await Data.insertMany(array);

        console.log(JSON.stringify(insertMany,'','\t'));

        res.status(200).send('Ok');
    })();
});



app.listen(port, () => console.log(`Listening on port ${port}`));