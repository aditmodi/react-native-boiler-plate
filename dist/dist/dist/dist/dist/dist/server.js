// server.js
'use strict';

// BASE SETUP
// call the packages we need

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// call express
var app = (0, _express2.default)(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('./models/user');

// ROUTES FOR OUR API
var routes = require('./routes/routes');
var imgRoute = require('./routes/images');
var labelRoute = require('./routes/labels');

var port = process.env.PORT || 3001; // set our port

// JWT configuration
var options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = '7x0jhxt&quot.kl9thpX6';

app.use(passport.initialize());

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// all of our routes will be prefixed with /api
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Configure Passport to use local strategy for initial authentication.
passport.use('local', new LocalStrategy(User.authenticate()));
// passport.use(new LocalStrategy(function(username, password, cb){
//   bcrypt.compare(password, user.hash, function(err, res){
//     if (err) return cb(err);
//     if (res === false) {
//       return cb(null, false);
//     }
//     else {
//       return cb(null, user);
//     }
//   })
// }))

// Configure Passport to use JWT strategy to look up Users
passport.use('jwt', new JwtStrategy(options, function (jwtPayload, done) {
  User.findOne({
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
app.use(passport.session());
app.use('/api', routes);

// For imageSchema
// app.use(multer({
//   dest: './uploads/',
//   rename: function (fieldname, filename) {
//     return filename;
//   }
// }).array('photo'));
app.use('/api', imgRoute);
app.use('/api', labelRoute);

mongoose.connect('mongodb://localhost:27017/react-native', { useMongoClient: true }, function (error) {
  if (error) {
    return console.error(error);
  }
}); // connect to our database

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);