'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Id = exports.token = undefined;

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

var server = require('../app-server');
var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

var token = exports.token = undefined;
var Id = exports.Id = undefined;

describe('Users', function () {
  // after((done) => {
  //   User.remove({}, (err) => {
  //     done();
  //   });
  // });
  describe('login', function () {
    it('should login an existing user', function (done) {
      _chai2.default.request(server).post('/api/login').send(_user4.default.login.validUser).end(function (err, res) {
        exports.token = token = res.body.token;
        exports.Id = Id = res.body.id;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('token');
        res.body.should.have.property('name').eql('abc');
        res.body.should.have.property('id');
        done();
      });
    });

    it('should not login a non-existing user', function (done) {
      _chai2.default.request(server).post('/api/login').send(_user4.default.login.nonExistUser).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('token').eql(null);
        res.body.should.have.property('message').eql('Your email or password is wrong!');
        done();
      });
    });

    it('should not login a null user', function (done) {
      _chai2.default.request(server).post('/api/login').send(_user4.default.login.nullUser).end(function (err, res) {
        res.should.have.status(500);
        res.body.should.be.a('object');
        done();
      });
    });

    it('should not login with empty email field', function (done) {
      _chai2.default.request(server).post('/api/login').send(_user4.default.login.emptyEmail).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Invalid credentials');
        done();
      });
    });

    it('should not login with empty password field', function (done) {
      _chai2.default.request(server).post('/api/login').send(_user4.default.login.emptyPass).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Invalid credentials');
        done();
      });
    });
  });
});