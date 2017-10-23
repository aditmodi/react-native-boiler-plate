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

var server = require('../app-server');
var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('Users', function () {
  before(function (done) {
    _user2.default.remove({}, function (err) {
      done();
    });
  });

  describe('register', function () {
    describe('Success case', function () {
      it('should register a user', function (done) {
        _chai2.default.request(server).post('/api/register').send(_user4.default.register.validUser).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Success!! You may now log in.');
          done();
        });
      });
    });

    describe('Failure cases', function () {
      it('should not register an existing user', function (done) {
        _chai2.default.request(server).post('/api/register').send(_user4.default.register.existingUser).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('User already exists');
          done();
        });
      });

      it('should not register user with invalid first name', function (done) {
        _chai2.default.request(server).post('/api/register').send(_user4.default.register.invalidUser.one).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('First Name is Invalid');
          done();
        });
      });

      it('should not register user with invalid last name', function (done) {
        _chai2.default.request(server).post('/api/register').send(_user4.default.register.invalidUser.two).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Last Name is Invalid');
          done();
        });
      });

      it('should not register user with invalid email', function (done) {
        _chai2.default.request(server).post('/api/register').send(_user4.default.register.invalidUser.three).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Email is Invalid');
          done();
        });
      });

      it('should not register user with missmatched passwords', function (done) {
        _chai2.default.request(server).post('/api/register').send(_user4.default.register.invalidUser.four).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Passwords do not match');
          done();
        });
      });

      it('should not register user with invalid gender', function (done) {
        _chai2.default.request(server).post('/api/register').send(_user4.default.register.invalidUser.five).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Gender should be either male or female');
          done();
        });
      });

      it('should not register user with invalid phone number', function (done) {
        _chai2.default.request(server).post('/api/register').send(_user4.default.register.invalidUser.six).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Phone is Invalid');
          done();
        });
      });

      it('should not register a null user', function (done) {
        _chai2.default.request(server).post('/api/register').send(_user4.default.register.nullUser).end(function (err, res) {
          res.should.have.status(500);
          done();
        });
      });
    });
  });
});