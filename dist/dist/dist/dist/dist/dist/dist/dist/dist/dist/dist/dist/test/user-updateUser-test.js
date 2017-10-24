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

  describe('Update User Details', function () {
    describe('Success Case', function () {
      it('should update the user with valid token, id and credentials', function (done) {
        _chai2.default.request(server).post('/api/updateUser/' + _userLoginTest.Id).set('token', _userLoginTest.token).send(_user4.default.updateUser.validUser).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('success').eqls(true);
          res.body.should.have.property('message').eqls('User updated');
          done();
        });
      });
    });

    describe('Failure Cases', function () {
      it('should not update the user with invalid token', function (done) {
        _chai2.default.request(server).post('/api/updateUser/' + _userLoginTest.Id).set('token', '1234').send(_user4.default.updateUser.validUser).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('success').eqls(false);
          res.body.should.have.property('message').eqls('Failed to authenticate token.');
          done();
        });
      });

      it('should not update the user with no token', function (done) {
        _chai2.default.request(server).post('/api/updateUser/' + _userLoginTest.Id).send(_user4.default.updateUser.validUser).end(function (err, res) {
          res.should.have.status(403);
          res.body.should.have.property('success').eqls(false);
          res.body.should.have.property('message').eqls('No token provided.');
          done();
        });
      });

      it('should not update the user with invalid id', function (done) {
        _chai2.default.request(server).post('/api/updateUser/1234').set('token', _userLoginTest.token).send(_user4.default.updateUser.validUser).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('success').eqls(false);
          res.body.should.have.property('message').eqls('Invalid Id');
          done();
        });
      });

      it('should not update the user with no id', function (done) {
        _chai2.default.request(server).post('/api/updateUser/').set('token', _userLoginTest.token).send(_user4.default.updateUser.validUser).end(function (err, res) {
          res.should.have.status(404);
          done();
        });
      });

      it('should not update the user with invalid first name', function (done) {
        _chai2.default.request(server).post('/api/updateUser/' + _userLoginTest.Id).set('token', _userLoginTest.token).send(_user4.default.updateUser.invalidFname).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('success').eqls(false);
          res.body.should.have.property('message').eqls('Error in first name');
          done();
        });
      });

      it('should not update the user with invalid last name', function (done) {
        _chai2.default.request(server).post('/api/updateUser/' + _userLoginTest.Id).set('token', _userLoginTest.token).send(_user4.default.updateUser.invalidLname).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('success').eqls(false);
          res.body.should.have.property('message').eqls('Error in last name');
          done();
        });
      });

      it('should not update the user with invalid email', function (done) {
        _chai2.default.request(server).post('/api/updateUser/' + _userLoginTest.Id).set('token', _userLoginTest.token).send(_user4.default.updateUser.invalidEmail).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('success').eqls(false);
          res.body.should.have.property('message').eqls('Error in email');
          done();
        });
      });

      it('should not update the user with invalid phone', function (done) {
        _chai2.default.request(server).post('/api/updateUser/' + _userLoginTest.Id).set('token', _userLoginTest.token).send(_user4.default.updateUser.invalidPhone).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('success').eqls(false);
          res.body.should.have.property('message').eqls('Error in phone number');
          done();
        });
      });

      it('should not update the user with invalid gender', function (done) {
        _chai2.default.request(server).post('/api/updateUser/' + _userLoginTest.Id).set('token', _userLoginTest.token).send(_user4.default.updateUser.invalidGender).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('success').eqls(false);
          res.body.should.have.property('message').eqls('Error in gender');
          done();
        });
      });

      it('should not update the user with null body', function (done) {
        _chai2.default.request(server).post('/api/updateUser/' + _userLoginTest.Id).set('token', _userLoginTest.token).send({}).end(function (err, res) {
          res.should.have.status(500);
          done();
        });
      });
    });
  });
});