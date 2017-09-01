// import {
//   alphaNumeric,
//   onlyNumber,
//   email
// } from '../validations-server';

let jwt = require('jsonwebtoken');
let User = require('../models/user');            // get an instance of the express Router
let config = require('../config');
let passport = require('passport');

// let roles = require('../permissions/permission');

// exports.getToken = function(req, res) { //to obtain token
//   console.log("aunthenticate");
//   // find the user
//   User.findOne({
//     email: req.body.email
//   }, function(err, user) {
//
//     if (err) throw err;
//
//     if (!user) {
//       res.json({ success: false, message: 'Authentication failed. User not found.' });
//     } else if (user) {
//
//       // check if password matches
//       if (user.password != req.body.password) {
//         res.json({ success: false, message: 'Authentication failed. Wrong password.' });
//       } else {
//
//         // if user is found and password is right
//         // create a token
//         let token = jwt.sign(user, config.secret, {
//           expiresIn: 1440 // expires in 24 hours
//         });
//
//         // return the information including token as JSON
//         res.json({
//           success: true,
//           // user : user.name,
//           message: 'Enjoy your token!',
//           token: token
//         });
//       }
//     }
//   });
// }
exports.check = function(req, res) {
    res.json("hooray! welcome to our api");
};
exports.addUser = function(req, res) {
  // let valid1 = alphaNumeric(req.body.fname);
  // let valid2 = alphaNumeric(req.body.lname);
  // let valid3 = email(req.body.email);
  // let valid4 = onlyNumber(req.body.phone);

  // if (valid1==true && valid2==true && valid3==true && valid4==true){

    let user = new User();      // create a new instance of the User model
    user.firstName = req.body.fname;  // set the users name (comes from the request)
    user.lastName = req.body.lname;
    user.email = req.body.email;
    user.password = req.body.password;
    user.gender = req.body.gender;
    user.phone = req.body.phone;
    // save the user and check for errors
    user.save(function(err) {
      if (err)
      return res.send(err);
      res.json({
        status : "ok",
        data   : user._id
      });
    });
  // }
};
exports.deleteUser = function(req,res) {
      User.findOneAndRemove({email:req.params.email}, function(err, user) {
          if(err)
            res.send(err)
          res.json({
	               status: "ok",
	               data :null
          })
        });
};
// exports.authUser = function(req, res, next) {
//         console.log("use");
//         let token = req.body.token || req.query.token || req.headers['x-access-token'];
//         // decode token
//         if (token) {
//           // verifies secret and checks exp
//           jwt.verify(token, config.secret, function(err, decoded) {
//             if (err) {
//               return res.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//               // if everything is good, save to request for use in other routes
//               req.decoded = decoded;
//               next();
//             }
//           });
//         } else {
//           // if there is no token
//           // return an error
//           return res.status(403).send({
//               success: false,
//               message: 'No token provided.'
//           });
//         }    // next(); // make sure we go to the next routes and don't stop here
// };
exports.getAll = function(req, res) {  //show all users
            User.find(function(err, users) {
                if (err)
                    res.send(err);

                res.json({
                  status: "ok",
                  data : users
                });
            });
};
exports.getByName = function(req, res) { //show user by username
                User.findOne({email:req.params.email}, function(err, user) {
                    if (err)
                        res.send(err);
                        res.json({
                          status: "ok",
                          data : user
                        });
                });
};
exports.updateUser = function(req, res) { //update user by username

               // use our user model to find the user we want
               User.findOne({email:req.params.email}, function(err, user) {
                   if (err)
                    res.send(err)
                    user.firstName = req.body.firstName;  // update the users name
                    user.lastName = req.body.lastName;  // update the users name
                   // save the user
                   user.save(function(err) {
                       if (err)
                          res.send(err)
                       res.json({
                         status : "ok",
                         data   : user.user_id
                        });
                   });
               });
};
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

// exports.authUser =  function(req, email, password, done) {
//           User.findOne({ email: email }, function (err, user) {
//             if (err) { return done(err); }
//             if (!user) { return done(null, false); }
//             if (!user.verifyPassword(password)) { return done(null, false); }
//             return done(null, user);
//     });
//   }

exports.authUser = function(req, res) {
  // res.redirect('/api');
  console.log("user :", req.user);
  console.log("user :", req.sessionID);
  var token = req.sessionID;
  // console.log()

  res.format({
    json: () => {
    // if (status) return res.status(status).json(obj);
    // console.log('190---------------',res.json(obj))
      return res.json({
        success : true,
        message : 'Enjoy your token',
        token : token
      });
    }
    });
  // res.json({
  //   success : true,
  //   message : 'Enjoy your token',
  //   token : token
  // })
  // console.log();
  // res.send(token);
}


////////////////////////////////////////////////////////////////////////////////
