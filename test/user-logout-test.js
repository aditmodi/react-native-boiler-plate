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
    it('should logout the user', (done) => {
      chai.request(server)
        .get('/api/logout')
        .set('token', token)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('ok');
          done();
        })
    })
  })
})
