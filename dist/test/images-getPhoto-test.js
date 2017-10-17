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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'test';

var server = require('../app-server');
var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('Get Images', function () {
  before(function (done) {
    _chai2.default.request(server).post('/api/addPhoto').set('token', _userLoginTest.token).send({
      data: _images4.default.second,
      id: _userLoginTest.Id
    }).end(function (err, res) {
      // done();
    });
    _chai2.default.request(server).post('/api/addPhoto').set('token', _userLoginTest.token).send({
      data: _images4.default.third,
      id: _userLoginTest.Id
    }).end(function (err, res) {
      done();
    });
  });

  after(function (done) {
    _images2.default.remove({}, function (err) {
      done();
    });
  });
  describe('Success case', function () {
    it('should show images with token', function (done) {
      _chai2.default.request(server).get('/api/getPhoto/' + _userLoginTest.Id).set('token', _userLoginTest.token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('status').eql('ok');
        done();
      });
    });

    it('should add 3 images and show them all', function (done) {

      _chai2.default.request(server).get('/api/getPhoto/' + _userLoginTest.Id).set('token', _userLoginTest.token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('data').with.length(3);
        done();
      });
    });
  });

  describe('Failure cases', function () {
    it('should not show images without token', function (done) {
      _chai2.default.request(server).get('/api/getPhoto/' + _userLoginTest.Id).end(function (err, res) {
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('No token provided.');
        done();
      });
    });

    it('should not show images with invalid token', function (done) {
      _chai2.default.request(server).get('/api/getPhoto/' + _userLoginTest.Id).set('token', '1234').end(function (err, res) {
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Failed to authenticate token.');
        done();
      });
    });
  });
});