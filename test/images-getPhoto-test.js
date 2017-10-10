process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import ImageDB from '../models/images';
import DummyImage from './fixtures/images';

import chai from 'chai';
import chaiHttp from 'chai-http';
let server = require('../app-server');
let should = chai.should();

chai.use(chaiHttp);

import { token } from './user-login-test';

describe('Images', () => {
  // after((done) => {
  //   ImageDB.remove({}, (err) => {
  //     done();
  //   })
  // });

  it('should show images with token', (done) => {
    chai.request(server)
      .get('/api/getPhoto/' + DummyImage.data.id)
      .set('token', token)
      .end((err, res) => {
        console.log("SDASDSAD:", res.body);
          res.should.have.status(200);
          res.body.should.have.property('status').eql('ok');
        done();
      })
  });
  it('should not show images without token', (done) => {
    chai.request(server)
      .get('/api/getPhoto/' + DummyImage.data.id)
      .set('token', null)
      .end((err, res) => {
        console.log("qqqqqqq:", res.body);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Failed to authenticate token.');
        done();
      })
  });
})
