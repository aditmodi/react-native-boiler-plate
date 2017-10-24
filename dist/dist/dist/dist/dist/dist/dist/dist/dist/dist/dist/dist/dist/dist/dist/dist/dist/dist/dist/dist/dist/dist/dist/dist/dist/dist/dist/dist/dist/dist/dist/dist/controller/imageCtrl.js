'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImages = exports.addImages = undefined;

var _images = require('../models/images');

var _images2 = _interopRequireDefault(_images);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _controller = require('./controller');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var addImages = exports.addImages = function addImages(req, res) {
  var newImg = new _images2.default();
  var regex64 = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;
  if (req.body.data !== null && req.body.id !== null) {
    if (regex64.test(req.body.data) && req.body.data !== null) {
      if (_controller.identity.equals(req.body.id) == true) {
        _cloudinary2.default.uploader.upload('data:image/jpg;base64,' + req.body.data, function (result) {
          newImg.img.url = result.secure_url;
          newImg.userId = req.body.id;
          newImg.date = new Date();
          newImg.save(function (err) {
            if (err) {
              return res.send(err);
            }
            res.json({
              status: 'ok',
              message: 'Picture saved'
            });
          });
        });
      } else {
        res.json({
          success: false,
          message: 'Wrong userId'
        });
      }
    } else {
      res.json({
        success: false,
        message: 'Not a base64 image'
      });
    }
  } else {
    res.json({
      success: false,
      message: 'Either data or id is null'
    });
  }
};

var getImages = exports.getImages = function getImages(req, res) {
  if (req.headers.token && _controller.identity.equals(req.params.id) == true) {
    _images2.default.find({ userId: req.params.id }).sort({ date: -1 }).exec(function (err, imageUrl) {
      if (err) res.send('tttttt' + err);
      res.json({
        'status': 'ok',
        'data': imageUrl
      });
    });
  } else {
    res.json({
      message: "Unauthorised user"
    });
  }
};