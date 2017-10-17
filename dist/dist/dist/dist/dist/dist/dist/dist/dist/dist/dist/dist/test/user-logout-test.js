// process.env.NODE_ENV = 'test';
//
// import mongoose from 'mongoose';
// import User from '../models/user';
// import DummyUser from './fixtures/user';
//
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// let server = require('../server');
// let should = chai.should();
//
// chai.use(chaiHttp);
//
// describe('Users', () => {
//   before((done) => {
//     User.remove({}, (err) => {
//       done();
//     });
//   });
//
//   describe('logout', () => {
//     it('should logout the user', () => {
//       chai.request('http://192.168.1.189:3001/api')
//         .post('/register')
//         .send(DummyUser.register.validUser);
//
//       chai.request('http://192.168.1.189:3001/api')
//         .post('/login')
//         .send(DummyUser.login.validUser);
//
//       chai.request('http://192.168.1.189:3001/api')
//         .get(/logout)
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.
//         })
//     })
//   })
// })
"use strict";