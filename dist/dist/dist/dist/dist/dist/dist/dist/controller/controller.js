'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authUser = exports.logOut = exports.register = exports.check = exports.login = undefined;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressPassportLogout = require('express-passport-logout');

var _expressPassportLogout2 = _interopRequireDefault(_expressPassportLogout);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _validationsServer = require('../validations-server');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var secret = '7x0jhxt"9(thpX6'; // get an instance of the express Router
var login = exports.login = function login(req, res, next) {
  var v = (0, _validationsServer.emailValidator)(req.body.username);
  var passLen = req.body.password.length;
  if (v === true && passLen !== 0) {
    _passport2.default.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ success: false, token: null, message: 'Your email or password is wrong!' });
      }
      if (user) {
        _bcrypt2.default.compare(req.body.password, user.password, function (err, ret) {
          if (ret == false) {
            return res.json({ success: false, token: null, message: 'Incorrect Password' });
          } else {
            var token = _jsonwebtoken2.default.sign({ id: user._id, email: user.email }, secret, {
              expiresIn: 1440 //expires in 24 hours
            });
            console.log('login --> auth: success token: ', token);
            return res.json({ success: true, token: token, name: user.firstName, id: user.id });
          }
        });
      }
    })(req, res, next);
  } else {
    return res.json({
      message: 'Invalid credentials'
    });
  }
};

var check = exports.check = function check(req, res) {
  res.json("hooray! welcome to our api");
};

var register = exports.register = function register(req, res) {
  if (req.body.fname !== null && req.body.lname !== null && req.body.email !== null && req.body.phone !== null && req.body.password !== null && req.body.cPassword !== null && req.body.gender !== null) {
    var email = (0, _validationsServer.emailValidator)(req.body.email);
    var fname = (0, _validationsServer.alphaNumeric)(req.body.fname);
    var lname = (0, _validationsServer.alphaNumeric)(req.body.lname);
    var phone = (0, _validationsServer.onlyNumber)(req.body.phone);
    var pass = (0, _validationsServer.passMatch)(req.body.password, req.body.cPassword);
    var gender = req.body.gender;
    if (fname === true && lname === true && email === true && phone === true && pass === true && (gender === 'male' || gender === 'female')) {
      _user2.default.findOne({ email: req.body.email }, function (err, user) {
        console.log("user:", user);
        if (err) {
          res.send(err);
        } else if (user == null) {
          _bcrypt2.default.hash(req.body.password, 10, function (err, hash) {
            _user2.default.register(new _user2.default({
              firstName: req.body.fname, // set the users name (comes from the request)
              lastName: req.body.lname,
              email: req.body.email,
              password: hash,
              gender: req.body.gender,
              phone: req.body.phone
            }), req.body.password, function (err, user) {
              if (err) {
                return res.status(400).send({ error: 'Email address in use.' });
              }
              user.save(function (err) {
                if (err) return res.send(err);
                res.json({
                  message: 'Success!! You may now log in.'
                });
              });
            });
          });
        } else {
          res.json({
            message: 'User already exists'
          });
        }
      });
    } else {
      return res.json({
        message: 'Invalid credentials'
      });
    }
  } else {
    return res.json({
      message: 'All fields are required'
    });
  }
};

var logOut = exports.logOut = function logOut(req, res) {
  req.logout();
  res.json({ status: 'ok' });
};

var authUser = exports.authUser = function authUser(req, res, next) {
  console.log("This is the required middleware");
  var token = req.headers['token'];
  // decode token
  if (token != null) {
    // verifies secret and checks exp
    _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
      if (err) {
        console.log("token", token);
        console.log("secret", secret);
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes;
        console.log("Coming here?");
        req.decoded = decoded;
        req.user = decoded;
        return next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};