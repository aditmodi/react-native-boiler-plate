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

describe('Get Images', () => {
  before((done) => {
    chai.request(server)
      .post('/api/addPhoto')
      .set('token', token)
      .send({
        data: DummyImage.second,
        id: Id
      })
      .end((err, res) => {
        // done();
      });
    chai.request(server)
      .post('/api/addPhoto')
      .set('token', token)
      .send({
        data: DummyImage.third,
        id: Id
      })
      .end((err, res) => {
        done();
      });
  });

  after((done) => {
    ImageDB.remove({}, (err) => {
      done();
    })
  })
  describe('Success case', () => {
    it('should show images with token', (done) => {
      chai.request(server)
        .get('/api/getPhoto/' + Id)
        .set('token', token)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('ok');
          done();
        })
    });

    it('should add 3 images and show them all', (done) => {

      chai.request(server)
        .get('/api/getPhoto/' + Id)
        .set('token', token)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('data').with.length(3)
          done();
        });
    });
  })

  describe('Failure cases', () => {
    it('should not show images without token', (done) => {
      chai.request(server)
        .get('/api/getPhoto/' + Id)
        .end((err, res) => {
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('No token provided.');
          done();
        })
    });

    it('should not show images with invalid token', (done) => {
      chai.request(server)
        .get('/api/getPhoto/' + Id)
        .set('token', '1234')
        .end((err, res) => {
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Failed to authenticate token.');
          done();
        })
    });
  })
})
