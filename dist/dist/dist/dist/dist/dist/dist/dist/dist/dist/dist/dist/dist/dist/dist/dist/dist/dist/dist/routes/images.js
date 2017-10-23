'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _imageCtrl = require('../controller/imageCtrl');

var _controller = require('../controller/controller');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var router = _express2.default.Router();

router.post('/addPhoto', _controller.authUser, _imageCtrl.addImages);
router.get('/getPhoto/:id', _controller.authUser, _imageCtrl.getImages);
exports.router = router;