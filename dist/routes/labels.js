'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _labelCtrl = require('../controller/labelCtrl');

var _controller = require('../controller/controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.post('/setLabel', _controller.authUser, _labelCtrl.addLabel);
exports.router = router;