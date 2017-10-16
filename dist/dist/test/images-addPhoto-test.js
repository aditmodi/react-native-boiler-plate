'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _images = require('../models/images');

var _images2 = _interopRequireDefault(_images);

var _images3 = require('./fixtures/images');

var _images4 = _interopRequireDefault(_images3);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _userLoginTest = require('./user-login-test');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

process.env.NODE_ENV = 'test';

var server = require('../app-server');
var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('Images', function () {
  before(function (done) {
    _images2.default.remove({}, function (err) {
      done();
    });
  });
  it('should add a 64-bit image url', function (done) {
    _chai2.default.request(server).post('/api/addPhoto').set('token', _userLoginTest.token).send(_images4.default.data).end(function (err, res) {
      console.log("ttttttt:", res.body);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('ok');
      res.body.should.have.property('message').eql('Picture saved');
      done();
    });
  });
});