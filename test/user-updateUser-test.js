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

  describe('Update User Details', () => {
    describe('Success Case', () => {
      it('should update the user with valid token, id and credentials', (done) => {
        chai.request(server)
          .post('/api/updateUser/' + Id)
          .set('token', token)
          .send(DummyUser.updateUser.validUser)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success').eqls(true);
              res.body.should.have.property('message').eqls('User updated');
            done();
          })
      })
    })

    describe('Failure Cases', () => {
      it('should not update the user with invalid token', (done) => {
        chai.request(server)
          .post('/api/updateUser/' + Id)
          .set('token', '1234')
          .send(DummyUser.updateUser.validUser)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success').eqls(false);
              res.body.should.have.property('message').eqls('Failed to authenticate token.');
            done();
          })
      })

      it('should not update the user with no token', (done) => {
        chai.request(server)
          .post('/api/updateUser/' + Id)
          .send(DummyUser.updateUser.validUser)
          .end((err, res) => {
              res.should.have.status(403);
              res.body.should.have.property('success').eqls(false);
              res.body.should.have.property('message').eqls('No token provided.');
            done();
          })
      })

      it('should not update the user with invalid id', (done) => {
        chai.request(server)
          .post('/api/updateUser/1234')
          .set('token', token)
          .send(DummyUser.updateUser.validUser)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success').eqls(false);
              res.body.should.have.property('message').eqls('Invalid Id');
            done();
          })
      })

      it('should not update the user with no id', (done) => {
        chai.request(server)
          .post('/api/updateUser/')
          .set('token', token)
          .send(DummyUser.updateUser.validUser)
          .end((err, res) => {
              res.should.have.status(404);
            done();
          })
      })

      it('should not update the user with invalid first name', (done) => {
        chai.request(server)
          .post('/api/updateUser/' + Id)
          .set('token', token)
          .send(DummyUser.updateUser.invalidFname)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success').eqls(false);
              res.body.should.have.property('message').eqls('Error in first name');
            done();
          })
      })

      it('should not update the user with invalid last name', (done) => {
        chai.request(server)
          .post('/api/updateUser/' + Id)
          .set('token', token)
          .send(DummyUser.updateUser.invalidLname)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success').eqls(false);
              res.body.should.have.property('message').eqls('Error in last name');
            done();
          })
      })

      it('should not update the user with invalid email', (done) => {
        chai.request(server)
          .post('/api/updateUser/' + Id)
          .set('token', token)
          .send(DummyUser.updateUser.invalidEmail)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success').eqls(false);
              res.body.should.have.property('message').eqls('Error in email');
            done();
          })
      })

      it('should not update the user with invalid phone', (done) => {
        chai.request(server)
          .post('/api/updateUser/' + Id)
          .set('token', token)
          .send(DummyUser.updateUser.invalidPhone)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success').eqls(false);
              res.body.should.have.property('message').eqls('Error in phone number');
            done();
          })
      })

      it('should not update the user with invalid gender', (done) => {
        chai.request(server)
          .post('/api/updateUser/' + Id)
          .set('token', token)
          .send(DummyUser.updateUser.invalidGender)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success').eqls(false);
              res.body.should.have.property('message').eqls('Error in gender');
            done();
          })
      })

      it('should not update the user with null body', (done) => {
        chai.request(server)
          .post('/api/updateUser/' + Id)
          .set('token', token)
          .send({})
          .end((err, res) => {
              res.should.have.status(500);
            done();
          })
      })
    })
  })
})
