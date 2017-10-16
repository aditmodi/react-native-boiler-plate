'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _labels = require('../models/labels');

var _labels2 = _interopRequireDefault(_labels);

var _label = require('./fixtures/label');

var _label2 = _interopRequireDefault(_label);

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

describe('Labels', function () {
  before(function (done) {
    _labels2.default.remove({}, function (err) {
      done();
    });
  });

  describe('Success case', function () {
    it('should add label with valid token', function (done) {
      _chai2.default.request(server).post('/api/setLabel').set('token', _userLoginTest.token).send({
        id: _userLoginTest.Id,
        label: _label2.default.valid.label,
        latitude: _label2.default.valid.latitude,
        longitude: _label2.default.valid.longitude
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('status').eql('ok');
        done();
      });
    });
  });

  describe('Failure cases', function () {
    it('should not add label with invalid token', function (done) {
      _chai2.default.request(server).post('/api/setLabel').set('token', '1234').send({
        id: _userLoginTest.Id,
        label: _label2.default.valid.label,
        latitude: _label2.default.valid.latitude,
        longitude: _label2.default.valid.longitude
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Failed to authenticate token.');
        done();
      });
    });

    it('should not add label with no token', function (done) {
      _chai2.default.request(server).post('/api/setLabel').send({
        id: _userLoginTest.Id,
        label: _label2.default.valid.label,
        latitude: _label2.default.valid.latitude,
        longitude: _label2.default.valid.longitude
      }).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('No token provided.');
        done();
      });
    });

    it('should not add label with wrong id', function (done) {
      _chai2.default.request(server).post('/api/setLabel').set('token', _userLoginTest.token).send({
        id: '1234',
        label: _label2.default.valid.label,
        latitude: _label2.default.valid.latitude,
        longitude: _label2.default.valid.longitude
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Wrong userId');
        done();
      });
    });

    it('should not add label with no id', function (done) {
      _chai2.default.request(server).post('/api/setLabel').set('token', _userLoginTest.token).send({
        id: null,
        label: _label2.default.valid.label,
        latitude: _label2.default.valid.latitude,
        longitude: _label2.default.valid.longitude
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Incomplete body');
        done();
      });
    });

    it('should not add label with empty coordinates', function (done) {
      _chai2.default.request(server).post('/api/setLabel').set('token', _userLoginTest.token).send({
        id: _userLoginTest.Id,
        label: _label2.default.valid.label,
        latitude: null,
        longitude: null
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Incomplete body');
        done();
      });
    });

    it('should not add label with null body', function (done) {
      _chai2.default.request(server).post('/api/setLabel').set('token', _userLoginTest.token).send({
        id: null,
        label: null,
        latitude: null,
        longitude: null
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Incomplete body');
        done();
      });
    });
  });
});