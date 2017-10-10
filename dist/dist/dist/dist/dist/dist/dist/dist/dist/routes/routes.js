'use strict';

var express = require('express');
var router = express.Router();
var ctrl = require('../controller/controller');

router.get('/', ctrl.check);
router.get('/logout', ctrl.authUser, ctrl.logOut);
router.get('/protected', ctrl.protected);
router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
module.exports = router;

// var app = require('express')();
// var basicAuth = require('express-basic-auth');

// router.post('/authenticate', ctrl.getToken);
// router.get('/', ctrl.check);
// router.post('/users',ctrl.addUser);
// router.delete('/users/:email',ctrl.deleteUser);
// router.use(ctrl.authUser);
// router.get('/users',ctrl.admin,ctrl.getAll);
// router.get('/users/:email',ctrl.admin,ctrl.getByName);
// router.put('/users/:email',ctrl.user,ctrl.updateUser);
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true,
//     session: true
// }, function(req, email, password, done) {
//   console.log("IS THIS CALLING?");
//           User.findOne({ email: email }, function (err, user) {
//             if (err) { return done(err); }
//             if (!user) { return done(null, false); }
//             if (user.password != password) { return done(null, false); }
//             else{
//               return done(null, user);
//             }
//     });
//   }
//   ));
// router.post('/authenticate',
//   passport.authenticate('local', { failureRedirect: '/api' }),
//   ctrl.getToken);
// passport.serializeUser(function(user, cb) {
//   console.log('serializeUser called');
//   cb(null, user.id);
// });
//
// passport.deserializeUser(function(id, cb) {
//   User.findById(id, function (err, user) {
//     if (err) { return cb(err); }
//     cb(null, user);
//   });
// });