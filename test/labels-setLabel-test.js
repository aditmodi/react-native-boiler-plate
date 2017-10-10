process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import Label from '../models/labels';
import DummyLabel from './fixtures/label';

import chai from 'chai';
import chaiHttp from 'chai-http';
let server = require('../app-server');
let should = chai.should();

chai.use(chaiHttp);

import { token } from './user-login-test';

describe('Labels', () => {
  before((done) => {
    Label.remove({}, (err) => {
      done();
    })
  });

  it('adds label', (done) => {
    chai.request(server)
      .post('/api/setLabel')
      .set('token', token)
      .send(DummyLabel)
      .end((err, res) => {
        console.log("WQEQWEQWEQW:", res.body);
          res.should.have.status(200);
          res.body.should.have.property('status').eql('ok');
        done();
      })
  })
})
