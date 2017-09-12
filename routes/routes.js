let express  = require('express');
let router = express.Router();
let ctrl = require('../controller/controller');
let passport = require('passport');
let User = require('../models/user');
var jwt = require('jsonwebtoken');

var secret = '7x0jhxt"9(thpX6';

router.get('/protected', function (req, res, next) {
  passport.authenticate('jwt', function (err, user, info) {
    if (err) {
      // internal server error occurred
      return next(err);
    }
    if (!user) {
      // no JWT or user found
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    if (user) {
// authentication was successful! send user the secret code.
      return res
        .status(200)
        .json({ secret: '123' });
    }
  })(req, res, next);
});

//users.js in routes
router.post('/register', function (req, res) {
  User.register(new User({
    firstName : req.body.fname,  // set the users name (comes from the request)
    lastName : req.body.lname,
    email : req.body.email,
    gender : req.body.gender,
    phone : req.body.phone,
  }), req.body.password, function (err, user) {
    if (err) {
      return res.status(400).send({ error: 'Email address in use.' })
    }
    user.save(function(err) {
          if (err)
          return res.send(err);
          res.json({
            status : "ok",
            data   : user._id
          });
    // res.status(200).send({ user: user.id });
  });
})
});

router.post('/login', function (req, res, next) {
  console.log('Route login: body  ', req.body);
  console.log('Route login: header  ', req.headers);

  passport.authenticate('local', function (err, user, info) {
    console.log('login --> auth: user ', user);
    console.log('login --> auth: info ', info);

    if (err) {
      console.error('login --> auth: err ', err);
      return next(err)
    }
    if (!user) {
      console.error('login --> auth: user not found');
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    if (user) {
    console.log('login --> auth: success user: ', user);
      var token = jwt.sign({ id: user._id, email: user.email }, secret);
      console.log('login --> auth: success token: ', token);

      return res
        .status(200)
        .json({ token: token });
    }
  })(req, res, next);
});

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
