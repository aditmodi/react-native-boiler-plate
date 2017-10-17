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

describe('Users', () => {

  describe('Update User Details', () => {
    describe('Success Case', () => {

    })

    describe('Failure Cases', () => {

    })
  })
})
