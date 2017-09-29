// import {
//   alphaNumeric,
//   onlyNumber,
//   email
// } from '../validations-server';
let jwt = require('jsonwebtoken');
let User = require('../models/user');            // get an instance of the express Router
let config = require('../config');
let passport = require('passport');
let logout = require('express-passport-logout');
let bcrypt = require('bcrypt');

var secret = '7x0jhxt"9(thpX6';

// let roles = require('../permissions/permission');
exports.login = function (req, res, next) {
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
      return res.json({ success: false, token: null, message: 'Your email or password is wrong!' });
    }
    if (user) {
      console.log('login --> auth: success user: ', user);
      bcrypt.compare(req.body.password, user.password, function(err, ret){
        if (ret == false) {
          return res.json({ success: false, token: null, message: 'Incorrect Password' });
        }
        else {
          var token = jwt.sign({ id: user._id, email: user.email }, secret, {
            expiresIn: 1440     //expires in 24 hours
          });
          console.log('login --> auth: success token: ', token);
          return res.json({ success: true, token: token, name: user.firstName });
        }
      })
    }
  })(req, res, next);
}

exports.check = function(req, res) {
    res.json("hooray! welcome to our api");
}

exports.register = function (req, res) {
  User.findOne({email:req.body.email}, function(err, user){
    console.log("user:", user);
    if (err) {
      res.send(err)
    }
    else if (user == null){
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        User.register(new User({
          firstName : req.body.fname,  // set the users name (comes from the request)
          lastName : req.body.lname,
          email : req.body.email,
          password : hash,
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
              message: 'Success!! You may now log in.'
            });
            // res.status(200).send({ user: user.id });
          });
        })
      });
    }
    else {
      res.json({
        message: 'User already exists'
      })
    }
  })
}


exports.protected = function (req, res, next) {
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
}

exports.logOut = function (req, res){
  console.log("USER:::::::::", req.user);
  console.log("USER:::::::::", req.headers);
  req.logout();
  res.json({status: 'ok'});
  // res.redirect('/api/login');
}

exports.authUser = function(req, res, next) {
  console.log(req.headers);
  console.log(req.headers['token']);
  let token = req.headers['token'];
  // decode token
  if (token != null) {
    // verifies secret and checks exp
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        req.user = decoded;
        console.log("Req.decoded::>>>>>>", req.decoded);
        return next();
      }
    });
  } else {
    // if there is no token
    // return an error
    console.log("NO ITS HERE");
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }    // next(); // make sure we go to the next routes and don't stop here
};
// exports.addUser = function(req, res) {
//   // let valid1 = alphaNumeric(req.body.fname);
//   // let valid2 = alphaNumeric(req.body.lname);
//   // let valid3 = email(req.body.email);
//   // let valid4 = onlyNumber(req.body.phone);
//
//   // if (valid1==true && valid2==true && valid3==true && valid4==true){
//
//     let user = new User();      // create a new instance of the User model
//     user.firstName = req.body.fname;  // set the users name (comes from the request)
//     user.lastName = req.body.lname;
//     user.email = req.body.email;
//     user.password = req.body.password;
//     user.gender = req.body.gender;
//     user.phone = req.body.phone;
//     // save the user and check for errors
//     user.save(function(err) {
//       if (err)
//       return res.send(err);
//       // res.json({
//       //   status : "ok",
//       //   data   : user._id
//       // });
//       res.redirect(200,'/api/register');
//     });
//   // }
//
// };
// exports.deleteUser = function(req,res) {
//       User.findOneAndRemove({email:req.params.email}, function(err, user) {
//           if(err)
//             res.send(err)
//           res.json({
// 	               status: "ok",
// 	               data :null
//           })
//         });
// };
// exports.getAll = function(req, res) {  //show all users
//             User.find(function(err, users) {
//                 if (err)
//                     res.send(err);
//
//                 res.json({
//                   status: "ok",
//                   data : users
//                 });
//             });
// };
// exports.getByName = function(req, res) { //show user by username
//                 User.findOne({email:req.params.email}, function(err, user) {
//                     if (err)
//                         res.send(err);
//                         res.json({
//                           status: "ok",
//                           data : user
//                         });
//                 });
// };
// exports.updateUser = function(req, res) { //update user by username
//
//                // use our user model to find the user we want
//                User.findOne({email:req.params.email}, function(err, user) {
//                    if (err)
//                     res.send(err)
//                     user.firstName = req.body.firstName;  // update the users name
//                     user.lastName = req.body.lastName;  // update the users name
//                    // save the user
//                    user.save(function(err) {
//                        if (err)
//                           res.send(err)
//                        res.json({
//                          status : "ok",
//                          data   : user.user_id
//                         });
//                    });
//                });
// };
// exports.admin = function (req, res, next) { // restrictions to admin
//       let role = req.decoded._doc.role;
//       console.log(role);
//       if (role === 'admin') {
//         return next();
//       } else {
//         res.status(403).send('Unauthorized Access!!')
//       }
// };
// exports.user = function (req, res, next) { // restrictions to user
//       let role = req.decoded._doc.role;
//       console.log(role);
//       if (role === 'user') {
//           next()
//       } else {
//           res.status(403).send('Unauthorized Access!!')
//       }
// };



// exports.getToken = function(req, res) {
//   // res.redirect('/api');
//   console.log("user :", req.user);
//   console.log("user :", req.sessionID);
//   var token = req.sessionID;
//   // console.log()
//
//   res.format({
//     json: () => {
//     // if (status) return res.status(status).json(obj);
//     // console.log('190---------------',res.json(obj))
//       return res.json({
//         success : true,
//         message : 'Enjoy your token',
//         token : token
//       });
//     }
//     });
  // res.json({
  //   success : true,
  //   message : 'Enjoy your token',
  //   token : token
  // })
  // console.log();
  // res.send(token);
// }


////////////////////////////////////////////////////////////////////////////////
