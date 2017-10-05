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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addImages = exports.addImages = function addImages(req, res) {
  var newImg = new _images2.default();
  _cloudinary2.default.uploader.upload('data:image/jpg;base64,' + req.body.data, function (result) {
    console.log("this is the url:", result);
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
};

var getImages = exports.getImages = function getImages(req, res) {
  if (req.headers.token) {
    _images2.default.find({ userId: req.params.id }).sort({ date: -1 }).exec(function (err, imageUrl) {
      console.log("IMAGE URL:::", imageUrl);
      if (err) res.send(err);
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