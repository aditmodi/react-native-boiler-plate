'use strict'

import User from '../models/user';            // get an instance of the express Router
import passport from 'passport';
import logout from 'express-passport-logout';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  alphaNumeric,
  emailValidator,
  onlyNumber,
  passMatch
} from '../validations-server';

var secret = '7x0jhxt"9(thpX6';

export const login = (req, res, next) => {
  let v = emailValidator(req.body.username);
  let passLen = req.body.password.length;
  if (v === true && passLen !== 0){
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.json({ success: false, token: null, message: 'Your email or password is wrong!' });
      }
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, ret) => {
          if (ret == false) {
            return res.json({ success: false, token: null, message: 'Incorrect Password' });
          }
          else {
            var token = jwt.sign({ id: user._id, email: user.email }, secret, {
              expiresIn: 1440     //expires in 24 hours
            });
            return res.json({ success: true, token: token, name: user.firstName, id: user.id });
          }
        })
      }
    })(req, res, next);
  }
  else {
    return res.json({
      message: 'Invalid credentials'
    })
  }
}

export const check = (req, res) => {
    res.json("hooray! welcome to our api");
}

export const register = (req, res) => {
  if(req.body.fname!==null && req.body.lname!==null && req.body.email!==null && req.body.phone!==null && req.body.password!==null && req.body.cPassword!==null && req.body.gender!==null){
    let email = emailValidator(req.body.email);
    let fname = alphaNumeric(req.body.fname);
    let lname = alphaNumeric(req.body.lname);
    let phone = onlyNumber(req.body.phone);
    let pass = passMatch(req.body.password, req.body.cPassword);
    let gender = req.body.gender;

    if(fname===true && lname===true && email===true && phone===true && pass===true  &&(gender==='male' || gender==='female')){
      User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
          res.send(err)
        }
        else if (user == null){
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            User.register(new User({
              firstName : req.body.fname,  // set the users name (comes from the request)
              lastName : req.body.lname,
              email : req.body.email,
              password : hash,
              gender : req.body.gender,
              phone : req.body.phone,
            }), req.body.password, (err, user) => {
              if (err) {
                return res.status(400).send({ error: 'Email address in use.' })
              }
              user.save((err) => {
                if (err)
                return res.send(err);
                res.json({
                  message: 'Success!! You may now log in.'
                });
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
    else {
      if (fname!==true) {
        return res.json({
          message: 'First Name is Invalid'
        })
      }
      else if (lname!==true) {
        return res.json({
          message: 'Last Name is Invalid'
        })
      }
      else if (email!==true) {
        return res.json({
          message: 'Email is Invalid'
        })
      }
      else if (phone!==true) {
        return res.json({
          message: 'Phone is Invalid'
        })
      }
      else if (pass!==true) {
        return res.json({
          message: 'Passwords do not match'
        })
      }
      else if (gender!=='female' || gender!=='male') {
        return res.json({
          message: 'Gender should be either male or female'
        })
      }
      else {
        return res.json({
          message: 'Invalid credentials'
        })
      }
    }
  }
  else {
    return res.json({
      message: 'All fields are required'
    })
  }
}


export const logOut = (req, res) => {
  req.logout();
  res.json({status: 'ok'});
}

export const authUser = (req, res, next) => {

  let token = req.headers['token'];
  console.log("token---> ", token);
  // decode token
  if (token != null) {
    // verifies secret and checks exp
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes;
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
