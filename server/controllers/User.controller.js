const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.TOKEN_PASS;

// app.get('/api/admin', withAuth, function(req, res) {
//
// });
exports.getAdmin = async (req, res) => {
    res.send('The password is potato');
}


exports.register = async (req, res) => {

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
    };

  exports.authenticate = async (req, res) => {
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
  }

  exports.checkToken = async (req, res) => {
    res.sendStatus(200);
  }