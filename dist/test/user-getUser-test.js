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

var _userLoginTest = require('./user-login-test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'test';
//dev dependencies

var server = require('../app-server');
var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('Users', function () {
  before(function (done) {
    _user2.default.remove({}, function (err) {
      done();
    });
    _chai2.default.request(server).post('/api/register').send(_user4.default.register.validUser);
  });

  describe('Get User Details', function () {
    describe('Success Case', function () {
      it('should get the details with valid token and id', function (done) {
        _chai2.default.request(server).get('/api/getUser' + _userLoginTest.Id).set('token', _userLoginTest.token).end(function (err, res) {
          console.log('>>>>>>>>', res.body, '>>>>', res.status);
          done();
        });
      });
    });

    describe('Failure Cases', function () {
      it('should not fetch details with invalid token', function (done) {
        _chai2.default.request(server).get('/api/getUser/' + _userLoginTest.Id).set('token', '1234').end(function (err, res) {
          console.log('>>>>>>>>', res.body, '>>>>', res.status);
          done();
        });
      });

      it('should not fetch details with invalid id', function (done) {
        _chai2.default.request(server).get('/api/getUser/123123').set('token', _userLoginTest.token).end(function (err, res) {
          console.log('>>>>>>>>', res.body, '>>>>', res.status);
          done();
        });
      });

      it('should not fetch details with null token', function (done) {
        _chai2.default.request(server).get('/api/getUser/' + _userLoginTest.Id).end(function (err, res) {
          console.log('>>>>>>>>', res.body, '>>>>', res.status);
          done();
        });
      });

      it('should not fetch details with null id', function (done) {
        _chai2.default.request(server).get('/api/getUser').set('token', _userLoginTest.token).end(function (err, res) {
          console.log('>>>>>>>>', res.body, '>>>>', res.status);
          done();
        });
      });
    });
  });
});