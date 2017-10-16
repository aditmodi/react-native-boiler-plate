process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import User from '../models/user';
import DummyUser from './fixtures/user';

import chai from 'chai';
import chaiHttp from 'chai-http';
let server = require('../app-server');
let should = chai.should();

chai.use(chaiHttp);

export var token;
export var Id;

describe('Users', () => {
  // after((done) => {
  //   User.remove({}, (err) => {
  //     done();
  //   });
  // });
  describe('login', () => {
    it('should login an existing user', (done) => {
      chai.request(server)
        .post('/api/login')
        .send(DummyUser.login.validUser)
        .end((err, res) => {
            token = res.body.token;
            Id = res.body.id;
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('token');
            res.body.should.have.property('name').eql('abc');
            res.body.should.have.property('id');
          done();
        })
    });

    it('should not login a non-existing user', (done) => {
      chai.request(server)
        .post('/api/login')
        .send(DummyUser.login.nonExistUser)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('token').eql(null);
            res.body.should.have.property('message').eql('Your email or password is wrong!');
          done();
        })
    });

    it('should not login a null user', (done) => {
      chai.request(server)
        .post('/api/login')
        .send(DummyUser.login.nullUser)
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
          done();
        })
    });

    it('should not login with empty email field', (done) => {
      chai.request(server)
        .post('/api/login')
        .send(DummyUser.login.emptyEmail)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Invalid credentials');
          done();
        })
    });

    it('should not login with empty password field', (done) => {
      chai.request(server)
        .post('/api/login')
        .send(DummyUser.login.emptyPass)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Invalid credentials');
          done();
        })
    });
  })
})
