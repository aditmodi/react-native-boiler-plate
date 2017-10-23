'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = exports.updateUser = exports.getUser = exports.authUser = exports.logOut = exports.register = exports.check = exports.login = exports.identity = undefined;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressPassportLogout = require('express-passport-logout');

var _expressPassportLogout2 = _interopRequireDefault(_expressPassportLogout);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _validationsServer = require('../validations-server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// get an instance of the express Router
var secret = '7x0jhxt"9(thpX6';

var identity = exports.identity = undefined;

var login = exports.login = function login(req, res, next) {
  var v = (0, _validationsServer.emailValidator)(req.body.username);
  var passLen = req.body.password.length;
  if (v === true && passLen !== 0) {
    _passport2.default.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ success: false, token: null, message: 'Your email or password is wrong!' });
      }
      if (user) {
        _bcrypt2.default.compare(req.body.password, user.password, function (err, ret) {
          if (ret == false) {
            return res.json({ success: false, token: null, message: 'Incorrect Password' });
          } else {
            exports.identity = identity = user._id;
            var token = _jsonwebtoken2.default.sign({ id: user._id, email: user.email }, secret, {
              expiresIn: 1440 //expires in 24 hours
            });
            return res.json({ success: true, token: token, name: user.firstName, id: user.id });
          }
        });
      }
    })(req, res, next);
  } else {
    return res.json({
      message: 'Invalid credentials'
    });
  }
};

var check = exports.check = function check(req, res) {
  res.json("hooray! welcome to our api");
};

var register = exports.register = function register(req, res) {
  if (req.body.fname !== null && req.body.lname !== null && req.body.email !== null && req.body.phone !== null && req.body.password !== null && req.body.cPassword !== null && req.body.gender !== null) {
    var email = (0, _validationsServer.emailValidator)(req.body.email);
    var fname = (0, _validationsServer.alphaNumeric)(req.body.fname);
    var lname = (0, _validationsServer.alphaNumeric)(req.body.lname);
    var phone = (0, _validationsServer.onlyNumber)(req.body.phone);
    var pass = (0, _validationsServer.passMatch)(req.body.password, req.body.cPassword);
    var gender = req.body.gender;

    if (fname === true && lname === true && email === true && phone === true && pass === true && (gender === 'male' || gender === 'female')) {
      _user2.default.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
          res.send(err);
        } else if (user == null) {
          _bcrypt2.default.hash(req.body.password, 10, function (err, hash) {
            _user2.default.register(new _user2.default({
              firstName: req.body.fname, // set the users name (comes from the request)
              lastName: req.body.lname,
              email: req.body.email,
              password: hash,
              gender: req.body.gender,
              phone: req.body.phone
            }), req.body.password, function (err, user) {
              if (err) {
                return res.status(400).send({ error: 'Email address in use.' });
              }
              user.save(function (err) {
                if (err) return res.send(err);
                res.json({
                  message: 'Success!! You may now log in.'
                });
              });
            });
          });
        } else {
          res.json({
            message: 'User already exists'
          });
        }
      });
    } else {
      if (fname !== true) {
        return res.json({
          message: 'First Name is Invalid'
        });
      } else if (lname !== true) {
        return res.json({
          message: 'Last Name is Invalid'
        });
      } else if (email !== true) {
        return res.json({
          message: 'Email is Invalid'
        });
      } else if (phone !== true) {
        return res.json({
          message: 'Phone is Invalid'
        });
      } else if (pass !== true) {
        return res.json({
          message: 'Passwords do not match'
        });
      } else if (gender !== 'female' || gender !== 'male') {
        return res.json({
          message: 'Gender should be either male or female'
        });
      } else {
        return res.json({
          message: 'Invalid credentials'
        });
      }
    }
  } else {
    return res.json({
      message: 'All fields are required'
    });
  }
};

var logOut = exports.logOut = function logOut(req, res) {
  req.logout();
  res.json({ status: 'ok' });
};

var authUser = exports.authUser = function authUser(req, res, next) {
  var token = req.headers['token'];
  console.log('!!!!!!!', token);
  // decode token
  if (token != null) {
    // verifies secret and checks exp
    _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes;
        console.log('|||||||||||');
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

var getUser = exports.getUser = function getUser(req, res) {
  if (identity.equals(req.params.id) == true && req.params.id.length != 0) {
    _user2.default.findById(req.params.id, function (err, user) {
      if (err) return res.send(err);
      return res.json({
        success: true,
        user: user
      });
    });
  } else {
    res.json({
      success: false,
      message: 'Invalid Id'
    });
  }
};

var updateUser = exports.updateUser = function updateUser(req, res) {
  console.log('~~~~~~~~~~~~', req.body);
  var f = (0, _validationsServer.alphaNumeric)(req.body.fname);
  var l = (0, _validationsServer.alphaNumeric)(req.body.lname);
  var e = (0, _validationsServer.emailValidator)(req.body.email);
  var p = (0, _validationsServer.onlyNumber)(req.body.phone);
  // let g = req.body.gender;
  if (f === false) {
    res.json({
      success: false,
      message: 'Error in first name'
    });
  } else if (l === false) {
    res.json({
      success: false,
      message: 'Error in last name'
    });
  } else if (e === false) {
    res.json({
      success: false,
      message: 'Error in email'
    });
  } else if (p === false) {
    res.json({
      success: false,
      message: 'Error in phone number'
    });
  } else if (req.body.gender != "male" && req.body.gender != "female") {
    res.json({
      success: false,
      message: 'Error in gender'
    });
  } else {
    if (identity.equals(req.params.id) == true) {
      _user2.default.findByIdAndUpdate(req.params.id, { $set: {
          firstName: req.body.fname,
          lastName: req.body.lname,
          email: req.body.email,
          phone: req.body.phone,
          gender: req.body.gender
        } }, { new: true }, function (err, user) {
        if (err) return res.send(err);
        return res.json({
          success: true,
          message: 'User updated'
        });
      });
    } else {
      res.json({
        success: false,
        message: 'Invalid Id'
      });
    }
  }
};

var sendEmail = exports.sendEmail = function sendEmail(req, res) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  _nodemailer2.default.createTestAccount(function (err, account) {

    // create reusable transporter object using the default SMTP transport
    var transporter = _nodemailer2.default.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass // generated ethereal password
      }
    });

    // setup email data with unicode symbols
    var mailOptions = {
      from: '"Fred Foo 👻" <modiadit95@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', _nodemailer2.default.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
};