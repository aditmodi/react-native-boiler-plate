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

var server = require('../app-server');
var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('Users', function () {
  // after((done) => {
  //   User.remove({}, (err) => {
  //     done();
  //   });
  // });

  describe('logout', function () {
    describe('Success case', function () {
      it('should logout the user with valid token', function (done) {
        _chai2.default.request(server).get('/api/logout').set('token', _userLoginTest.token).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('ok');
          done();
        });
      });
    });

    describe('Failure cases', function () {
      it('should not logout the user with invalid token', function (done) {
        _chai2.default.request(server).get('/api/logout').set('token', '1234').end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Failed to authenticate token.');
          done();
        });
      });

      it('should not logout the user with no token', function (done) {
        _chai2.default.request(server).get('/api/logout').end(function (err, res) {
          res.should.have.status(403);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('No token provided.');
          done();
        });
      });
    });
  });
});