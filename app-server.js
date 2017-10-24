// server.js

// BASE SETUP
// call the packages we need
import express from 'express';
// call express
const app = express(); // define our app using express
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from './models/user';


// ROUTES FOR OUR API
import { router as routes } from './routes/routes';
import { router as imgRoute } from './routes/images';
import { router as labelRoute } from './routes/labels';

const port = process.env.PORT || 3001; // set our port

// JWT configuration
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = '7x0jhxt&quot.kl9thpX6';


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(passport.initialize());
// all of our routes will be prefixed with /api
app.use(require('serve-static')(`${__dirname}/../../public`));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Configure Passport to use local strategy for initial authentication.
passport.use('local', new LocalStrategy(User.authenticate()));

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
app.use('/api', imgRoute);
app.use('/api', labelRoute);


mongoose.connect('mongodb://localhost:27017/react-native', { useMongoClient: true }, (error) => {
  if (error) {
    return console.error(error);
  }
}); // connect to our database

// START THE SERVER
module.exports = app.listen(port);
console.log(`Magic happens on port ${port}`);
