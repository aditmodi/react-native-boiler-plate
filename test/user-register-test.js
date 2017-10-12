process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import User from '../models/user';
import DummyUser from './fixtures/user';

import chai from 'chai';
import chaiHttp from 'chai-http';
let server = require('../app-server');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  before((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  describe('register', () => {
    describe('Success case', () => {
      it('should register a user', (done) => {
        chai.request(server)
        .post('/api/register')
        .send(DummyUser.register.validUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Success!! You may now log in.');
          done();
        })
      });
    });

    describe('Failure cases', () => {
      it('should not register an existing user', (done) => {
        chai.request(server)
        .post('/api/register')
        .send(DummyUser.register.existingUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('User already exists');
          done();
        })
      });

      it('should not register user with invalid first name', (done) => {
        chai.request(server)
        .post('/api/register')
        .send(DummyUser.register.invalidUser.one)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('First Name is Invalid');
          done();
        })
      });

      it('should not register user with invalid last name', (done) => {
        chai.request(server)
        .post('/api/register')
        .send(DummyUser.register.invalidUser.two)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Last Name is Invalid');
          done();
        })
      });

      it('should not register user with invalid email', (done) => {
        chai.request(server)
        .post('/api/register')
        .send(DummyUser.register.invalidUser.three)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Email is Invalid');
          done();
        })
      });

      it('should not register user with missmatched passwords', (done) => {
        chai.request(server)
        .post('/api/register')
        .send(DummyUser.register.invalidUser.four)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Passwords do not match');
          done();
        })
      });

      it('should not register user with invalid gender', (done) => {
        chai.request(server)
        .post('/api/register')
        .send(DummyUser.register.invalidUser.five)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Gender should be either male or female');
          done();
        })
      });

      it('should not register user with invalid phone number', (done) => {
        chai.request(server)
        .post('/api/register')
        .send(DummyUser.register.invalidUser.six)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Phone is Invalid');
          done();
        })
      });

      it('should not register a null user', (done) => {
        chai.request(server)
        .post('/api/register')
        .send(DummyUser.register.nullUser)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        })
      })
    })

  });
})
