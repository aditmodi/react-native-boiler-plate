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
import { Id } from './user-login-test';

describe('Add Images', () => {
  before((done) => {
    ImageDB.remove({}, (err) => {
      done();
    })
  });
  describe('Success case', () => {
    it('should add a 64-bit image url with valid token and userId', (done) => {
      chai.request(server)
      .post('/api/addPhoto')
      .set('token', token)
      .send({
        data: DummyImage.validData,
        id: Id
      })
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('ok');
          res.body.should.have.property('message').eql('Picture saved');
        done();
      })
    })
  });

  describe('Failure cases', () => {
    it('should not add a 64-bit image url with valid userId but invalid token', (done) => {
      chai.request(server)
      .post('/api/addPhoto')
      .set('token', '1234')
      .send({
        data: DummyImage.validData,
        id: Id
      })
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Failed to authenticate token.');
        done();
      })
    });

    it('should not add a 64-bit image url with valid userId but no token', (done) => {
      chai.request(server)
      .post('/api/addPhoto')
      .send({
        data: DummyImage.validData,
        id: Id
      })
      .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('No token provided.');
        done();
      })
    });

    it('should not add image which is not base64', (done) => {
      chai.request(server)
      .post('/api/addPhoto')
      .set('token', token)
      .send({
        data: DummyImage.invalidData,
        id: Id
      })
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Not a base64 image');
        done();
      })
    });

    it('should not add a 64-bit image url with valid token but invalid userId', (done) => {
      chai.request(server)
      .post('/api/addPhoto')
      .set('token', token)
      .send({
        data: DummyImage.validData,
        id: '1234'
      })
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Wrong userId');
        done();
      })
    });

    it('should not add a 64-bit image url with valid token but no userId', (done) => {
      chai.request(server)
      .post('/api/addPhoto')
      .set('token', token)
      .send({
        data: DummyImage.validData,
        id: null
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Either data or id is null');
        done();
      })
    });

    it('should not add image in which no image is sent but has valid token and valid userId', (done) => {
      chai.request(server)
      .post('/api/addPhoto')
      .set('token', token)
      .send({
        data: null,
        id: Id
      })
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Either data or id is null');
        done();
      })
    });

    it('should not add for a null request', (done) => {
      chai.request(server)
      .post('/api/addPhoto')
      .set('token', token)
      .send({
        data: null,
        id: null
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Either data or id is null');
        done();
      })
    });
  })
})
