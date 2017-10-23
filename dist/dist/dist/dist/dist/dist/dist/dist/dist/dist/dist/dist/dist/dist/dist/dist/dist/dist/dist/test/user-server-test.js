'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

process.env.NODE_ENV = 'test';

//dev dependencies

var server = require('../server');
var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('Check server', function () {
  it('should start the server', function (done) {
    _chai2.default.request('http://192.168.1.189:3001/api').get('/').end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('string');
      res.body.length.should.be.eql(26);
      done();
    });
  });
});