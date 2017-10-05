'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _imageCtrl = require('../controller/imageCtrl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.post('/addPhoto', _imageCtrl.addImages);
router.get('/getPhoto/:userId', _imageCtrl.getImages);
exports.router = router;