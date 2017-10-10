'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _user3 = require('./fixtures/user');

var _user4 = _interopRequireDefault(_user3);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

process.env.NODE_ENV = 'test';

var server = require('../server');
var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('Users', function () {
  before(function (done) {
    _user2.default.remove({}, function (err) {
      done();
    });
  });

  describe('login', function () {
    it('should login an existing user', function () {
      _chai2.default.request('http://192.168.1.189:3001/api').post('/register').send(_user4.default.register.validUser);

      _chai2.default.request('http://192.168.1.189:3001/api').post('/login').send(_user4.default.login.validUser).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('username');
        res.body.should.have.property('password');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('token');
        res.body.should.have.property('name').eql('abc');
        res.body.should.have.property('id');
        done();
      });
    });

    it('should not login a non-existing user', function () {
      _chai2.default.request('http://192.168.1.189:3001/api').post('/login').send(_user4.default.login.nonExistUser).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.errors.should.have.property('success').eql(false);
        res.body.errors.should.have.property('token').eql(null);
        res.body.errors.should.have.property('message').eql('Your email or password is wrong!');
        done();
      });
    });

    it('should not login a null user', function () {
      _chai2.default.request('http://192.168.1.189:3001/api').post('/login').send(_user4.default.login.nullUser).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.errors.should.have.property('message').eql('Invalid credentials');
        done();
      });
    });
  });
});