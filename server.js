// server.js

// BASE SETUP
// call the packages we need
let express = require('express');        // call express
let app = express();                 // define our app using express
let bodyParser = require('body-parser');
let mongoose   = require('mongoose');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
let User = require('./models/user');
const multer = require('multer');


// ROUTES FOR OUR API
var routes = require('./routes/routes');
var imgRoute = require('./routes/images');


let port = process.env.PORT || 3001;        // set our port

// JWT configuration
 var options = {};
 options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
 options.secretOrKey = '7x0jhxt&quot.kl9thpX6';

 app.use(passport.initialize());

 // configure app to use bodyParser()
 // this will let us get the data from a POST
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));

 // all of our routes will be prefixed with /api
 app.use(require('serve-static')(__dirname + '/../../public'));
 app.use(require('cookie-parser')());
 app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

 // Configure Passport to use local strategy for initial authentication.
 passport.use('local', new LocalStrategy(User.authenticate()));

// Configure Passport to use JWT strategy to look up Users
passport.use('jwt', new JwtStrategy(options, function(jwt_payload, done) {
  console.log("WORKINGGG", jwt_payload);
  User.findOne({
    _id: jwt_payload.id
  }, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
}));

// app.use(passport.initialize());
app.use(passport.session());
app.use('/api', routes);

//For imageSchema
app.use('/api', imgRoute);
app.use(multer({
  dest: './uploads/',
  rename: function (fieldname, filename) {
    return filename;
  }
}).array('photo'));


mongoose.connect('mongodb://localhost:27017/react-native', { useMongoClient: true }, (error) => {
  if(error){
    return console.error(error);
  }
}); // connect to our database

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
