'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controller = require('../controller/controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.get('/', _controller.check);
router.get('/logout', _controller.authUser, _controller.logOut);
router.post('/register', _controller.register);
router.post('/login', _controller.login);
router.get('/getUser/:id', _controller.authUser, _controller.getUser);
router.post('/updateUser/:id', _controller.authUser, _controller.updateUser);
exports.router = router;