process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import User from '../models/user';
import DummyUser from './fixtures/user';
//dev dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
let server = require('../app-server');
let should = chai.should();

chai.use(chaiHttp);

import { token } from './user-login-test';
import { Id } from './user-login-test';

describe('Users', () => {
  before((done) => {
    User.remove({}, (err) => {
      done();
    })
    chai.request(server)
      .post('/api/register')
      .send(DummyUser.register.validUser)
  })

  describe('Get User Details', () => {
    describe('Success Case', () => {
      it('should get the details with valid token and id', (done) => {
        chai.request(server)
          .get('/api/getUser' + Id)
          .set('token', token)
          .end((err, res) => {
            console.log('>>>>>>>>', res.body, '>>>>', res.status);
            done();
          })
      })
    })

    describe('Failure Cases', () => {
      it('should not fetch details with invalid token', (done) => {
        chai.request(server)
          .get('/api/getUser/' + Id)
          .set('token', '1234')
          .end((err, res) => {
            console.log('>>>>>>>>', res.body, '>>>>', res.status);
            done();
          })
      })

      it('should not fetch details with invalid id', (done) => {
        chai.request(server)
          .get('/api/getUser/123123')
          .set('token', token)
          .end((err, res) => {
            console.log('>>>>>>>>', res.body, '>>>>', res.status);
            done();
          })
      })

      it('should not fetch details with null token', (done) => {
        chai.request(server)
          .get('/api/getUser/' + Id)
          .end((err, res) => {
            console.log('>>>>>>>>', res.body, '>>>>', res.status);
            done();
          })
      })

      it('should not fetch details with null id', (done) => {
        chai.request(server)
          .get('/api/getUser')
          .set('token', token)
          .end((err, res) => {
            console.log('>>>>>>>>', res.body, '>>>>', res.status);
            done();
          })
      })
    })
  })
})
