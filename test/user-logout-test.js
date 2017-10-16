process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import User from '../models/user';
import DummyUser from './fixtures/user';

import chai from 'chai';
import chaiHttp from 'chai-http';
let server = require('../app-server');
let should = chai.should();

chai.use(chaiHttp);

import { token } from './user-login-test';

describe('Users', () => {
  // after((done) => {
  //   User.remove({}, (err) => {
  //     done();
  //   });
  // });

  describe('logout', () => {
    describe('Success case', () => {
      it('should logout the user with valid token', (done) => {
        chai.request(server)
        .get('/api/logout')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('ok');
          done();
        })
      });
    })

    describe('Failure cases', () => {
      it('should not logout the user with invalid token', (done) => {
        chai.request(server)
        .get('/api/logout')
        .set('token', '1234')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Failed to authenticate token.');
          done();
        })
      });

      it('should not logout the user with no token', (done) => {
        chai.request(server)
        .get('/api/logout')
        .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('No token provided.');
          done();
        })
      })
    })
  })
})
