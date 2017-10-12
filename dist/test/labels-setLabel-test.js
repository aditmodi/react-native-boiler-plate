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

  it('adds label', function (done) {
    _chai2.default.request(server).post('/api/setLabel').set('token', _userLoginTest.token).send(_label2.default).end(function (err, res) {
      console.log("WQEQWEQWEQW:", res.body);
      res.should.have.status(200);
      res.body.should.have.property('status').eql('ok');
      done();
    });
  });
});