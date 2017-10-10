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
  before(function (done) {
    _user2.default.remove({}, function (err) {
      done();
    });
  });

  describe('logout', function () {
    it('should logout the user', function () {
      _chai2.default.request(server).post('/api/register').send(_user4.default.register.validUser);

      _chai2.default.request(server).post('/api/login').send(_user4.default.login.validUser);

      _chai2.default.request(server).get('/api/logout').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('ok');
      });
    });
  });
});