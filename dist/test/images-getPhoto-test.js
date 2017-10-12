'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _images = require('../models/images');

var _images2 = _interopRequireDefault(_images);

var _images3 = require('./fixtures/images');

var _images4 = _interopRequireDefault(_images3);

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

describe('Images', function () {
  // after((done) => {
  //   ImageDB.remove({}, (err) => {
  //     done();
  //   })
  // });

  it('should show images with token', function (done) {
    _chai2.default.request(server).get('/api/getPhoto/' + _images4.default.data.id).set('token', _userLoginTest.token).end(function (err, res) {
      console.log("SDASDSAD:", res.body);
      res.should.have.status(200);
      res.body.should.have.property('status').eql('ok');
      done();
    });
  });
  it('should not show images without token', function (done) {
    _chai2.default.request(server).get('/api/getPhoto/' + _images4.default.data.id).set('token', null).end(function (err, res) {
      console.log("qqqqqqq:", res.body);
      res.body.should.have.property('success').eql(false);
      res.body.should.have.property('message').eql('Failed to authenticate token.');
      done();
    });
  });
});