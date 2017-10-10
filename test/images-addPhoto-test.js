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
  before((done) => {
    ImageDB.remove({}, (err) => {
      done();
    })
  })
  it('should add a 64-bit image url', (done) => {
    chai.request(server)
      .post('/api/addPhoto')
      .set('token', token)
      .send(DummyImage.data)
      .end((err, res) => {
        console.log("ttttttt:", res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('ok');
          res.body.should.have.property('message').eql('Picture saved');
        done();
      })
  })
})
