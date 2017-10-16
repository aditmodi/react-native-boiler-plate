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

describe('Add Images', function () {
  before(function (done) {
    _images2.default.remove({}, function (err) {
      done();
    });
  });
  describe('Success case', function () {
    it('should add a 64-bit image url with valid token and userId', function (done) {
      _chai2.default.request(server).post('/api/addPhoto').set('token', _userLoginTest.token).send({
        data: _images4.default.validData,
        id: _userLoginTest.Id
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('ok');
        res.body.should.have.property('message').eql('Picture saved');
        done();
      });
    });
  });

  describe('Failure cases', function () {
    it('should not add a 64-bit image url with valid userId but invalid token', function (done) {
      _chai2.default.request(server).post('/api/addPhoto').set('token', '1234').send({
        data: _images4.default.validData,
        id: _userLoginTest.Id
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Failed to authenticate token.');
        done();
      });
    });

    it('should not add a 64-bit image url with valid userId but no token', function (done) {
      _chai2.default.request(server).post('/api/addPhoto').send({
        data: _images4.default.validData,
        id: _userLoginTest.Id
      }).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('No token provided.');
        done();
      });
    });

    it('should not add image which is not base64', function (done) {
      _chai2.default.request(server).post('/api/addPhoto').set('token', _userLoginTest.token).send({
        data: _images4.default.invalidData,
        id: _userLoginTest.Id
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Not a base64 image');
        done();
      });
    });

    it('should not add a 64-bit image url with valid token but invalid userId', function (done) {
      _chai2.default.request(server).post('/api/addPhoto').set('token', _userLoginTest.token).send({
        data: _images4.default.validData,
        id: '1234'
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Wrong userId');
        done();
      });
    });

    it('should not add a 64-bit image url with valid token but no userId', function (done) {
      _chai2.default.request(server).post('/api/addPhoto').set('token', _userLoginTest.token).send({
        data: _images4.default.validData,
        id: null
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Either data or id is null');
        done();
      });
    });

    it('should not add image in which no image is sent but has valid token and valid userId', function (done) {
      _chai2.default.request(server).post('/api/addPhoto').set('token', _userLoginTest.token).send({
        data: null,
        id: _userLoginTest.Id
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Either data or id is null');
        done();
      });
    });

    it('should not add for a null request', function (done) {
      _chai2.default.request(server).post('/api/addPhoto').set('token', _userLoginTest.token).send({
        data: null,
        id: null
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Either data or id is null');
        done();
      });
    });
  });
});