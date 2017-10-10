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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'test';

var server = require('../app-server');
var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('Users', function () {
  beforeEach(function (done) {
    _user2.default.remove({}, function (err) {
      done();
    });
  });

  describe('register', function () {
    it('should register a user', function (done) {
      _chai2.default.request('http://192.168.1.189:3001/api').post('/register').send(_user4.default.register.validUser).end(function (err, res) {
        console.log("REGISTER VALID:", res.status);
        // res.should.have.status(500);
        // res.body.should.be.a('object');
        // // res.body.should.have.property('message').eql('Success!! You may now log in.');
        // res.body.should.have.property('firstName');
        // res.body.should.have.property('lastName');
        // res.body.should.have.property('email');
        // res.body.should.have.property('password');
        // res.body.should.have.property('gender');
        // res.body.should.have.property('phone');
        // expect(res.status).to.equal(300);
        done();
      });
    });

    it('should not register an existing user', function (done) {
      _chai2.default.request(server).post('/api/register').send(_user4.default.register.existingUser).end(function (err, res) {
        res.should.have.status(400);
        res.body.errors.should.have.property('error').eql('Email address in use.');
        done();
      });
    });

    it('should not register user with invalid credentials', function (done) {
      _chai2.default.request(server).post('/api/register').send(_user4.default.register.invalidUser).end(function (err, res) {
        res.should.have.status(404);
        res.body.errors.should.have.property('message').eql('Invalid credentials');
      });
    });

    it('should not register a null user', function (done) {
      _chai2.default.request(server).post('/api/register').send(_user4.default.register.nullUser).end(function (err, res) {
        res.should.have.status(404);
        res.body.errors.should.have.property('message').eql('All fields are required');
        done();
      });
    });
  });
});