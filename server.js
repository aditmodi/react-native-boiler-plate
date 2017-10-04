// server.js

// BASE SETUP
// call the packages we need
const express = require('express');
// call express
const app = express(); // define our app using express
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');


// ROUTES FOR OUR API
const routes = require('./routes/routes');
const imgRoute = require('./routes/images');
const labelRoute = require('./routes/labels');


const port = process.env.PORT || 3001; // set our port

// JWT configuration
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = '7x0jhxt&quot.kl9thpX6';

app.use(passport.initialize());

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// all of our routes will be prefixed with /api
app.use(require('serve-static')(`${__dirname}/../../public`));
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
passport.use('jwt', new JwtStrategy(options, ((jwtPayload, done) => {
  User.findOne({
    _id: jwtPayload.id,
  }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
})));

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
app.use('/api', labelRoute)


mongoose.connect('mongodb://localhost:27017/react-native', { useMongoClient: true }, (error) => {
  if (error) {
    return console.error(error);
  }
}); // connect to our database

// START THE SERVER
app.listen(port);
console.log(`Magic happens on port ${port}`);
