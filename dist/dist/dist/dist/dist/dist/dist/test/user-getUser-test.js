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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

process.env.NODE_ENV = 'test';
//dev dependencies

var server = require('../app-server');
var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('Users', function () {
  // before((done) => {
  //   User.remove({}, (err) => {
  //     chai.request(server)
  //     .post('/api/register')
  //     .send(DummyUser.register.validUser)
  //     done();
  //   })
  // })

  describe('Get User Details', function () {
    describe('Success Case', function () {
      it('should get the details with valid token and id', function (done) {
        _chai2.default.request(server).get('/api/getUser/' + _userLoginTest.Id).set('token', _userLoginTest.token).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('success').eqls(true);
          res.body.should.have.property('user');
          done();
        });
      });
    });

    describe('Failure Cases', function () {
      it('should not fetch details with invalid id', function (done) {
        _chai2.default.request(server).get('/api/getUser/123123').set('token', _userLoginTest.token).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('success').eqls(false);
          res.body.should.have.property('message').eqls('Invalid Id');
          done();
        });
      });

      it('should not fetch details with invalid token', function (done) {
        _chai2.default.request(server).get('/api/getUser/' + _userLoginTest.Id).set('token', '1234').end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('success').eqls(false);
          res.body.should.have.property('message').eqls('Failed to authenticate token.');
          done();
        });
      });

      it('should not fetch details with null token', function (done) {
        _chai2.default.request(server).get('/api/getUser/' + _userLoginTest.Id).end(function (err, res) {
          res.should.have.status(403);
          res.body.should.have.property('success').eqls(false);
          res.body.should.have.property('message').eqls('No token provided.');
          done();
        });
      });

      it('should not fetch details with null id', function (done) {
        _chai2.default.request(server).get('/api/getUser/').set('token', _userLoginTest.token).end(function (err, res) {
          res.should.have.status(404);
          done();
        });
      });
    });
  });
});