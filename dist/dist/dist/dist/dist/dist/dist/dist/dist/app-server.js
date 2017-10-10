'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportJwt = require('passport-jwt');

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

var _routes = require('./routes/routes');

var _images = require('./routes/images');

var _labels = require('./routes/labels');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// call express
var app = (0, _express2.default)(); // define our app using express
// server.js

// BASE SETUP
// call the packages we need


// ROUTES FOR OUR API


var port = process.env.PORT || 3001; // set our port

// JWT configuration
var options = {};
options.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = '7x0jhxt&quot.kl9thpX6';

app.use(_passport2.default.initialize());

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(_bodyParser2.default.json({ limit: '50mb' }));
app.use(_bodyParser2.default.urlencoded({ limit: '50mb', extended: true }));

// all of our routes will be prefixed with /api
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Configure Passport to use local strategy for initial authentication.
_passport2.default.use('local', new _passportLocal.Strategy(_user2.default.authenticate()));

// Configure Passport to use JWT strategy to look up Users
_passport2.default.use('jwt', new _passportJwt.Strategy(options, function (jwtPayload, done) {
  _user2.default.findOne({
    _id: jwtPayload.id
  }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
}));

// app.use(passport.initialize());
app.use(_passport2.default.session());
app.use('/api', _routes.router);
app.use('/api', _images.router);
app.use('/api', _labels.router);

_mongoose2.default.connect('mongodb://localhost:27017/react-native', { useMongoClient: true }, function (error) {
  if (error) {
    return console.error(error);
  }
}); // connect to our database

// START THE SERVER
module.exports = app.listen(port);
console.log('Magic happens on port ' + port);