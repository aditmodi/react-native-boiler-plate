process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import Label from '../models/labels';
import DummyLabel from './fixtures/label';

import chai from 'chai';
import chaiHttp from 'chai-http';
let server = require('../app-server');
let should = chai.should();

chai.use(chaiHttp);

import { token } from './user-login-test';
import { Id } from './user-login-test';

describe('Labels', () => {
  before((done) => {
    Label.remove({}, (err) => {
      done();
    })
  });

  describe('Success case', () => {
    it('should add label with valid token', (done) => {
      chai.request(server)
      .post('/api/setLabel')
      .set('token', token)
      .send({
        id: Id,
        label: DummyLabel.valid.label,
        latitude: DummyLabel.valid.latitude,
        longitude: DummyLabel.valid.longitude
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql('ok');
        done();
      })
    })
  })

  describe('Failure cases', () => {
    it('should not add label with invalid token', (done) => {
      chai.request(server)
        .post('/api/setLabel')
        .set('token', '1234')
        .send({
          id: Id,
          label: DummyLabel.valid.label,
          latitude: DummyLabel.valid.latitude,
          longitude: DummyLabel.valid.longitude
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Failed to authenticate token.');
          done();
        })
    });

    it('should not add label with no token', (done) => {
      chai.request(server)
        .post('/api/setLabel')
        .send({
          id: Id,
          label: DummyLabel.valid.label,
          latitude: DummyLabel.valid.latitude,
          longitude: DummyLabel.valid.longitude
        })
        .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('No token provided.');
          done();
        })
    });

    it('should not add label with wrong id', (done) => {
      chai.request(server)
        .post('/api/setLabel')
        .set('token', token)
        .send({
          id: '1234',
          label: DummyLabel.valid.label,
          latitude: DummyLabel.valid.latitude,
          longitude: DummyLabel.valid.longitude
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Wrong userId');
          done();
        })
    })

    it('should not add label with no id', (done) => {
      chai.request(server)
        .post('/api/setLabel')
        .set('token', token)
        .send({
          id: null,
          label: DummyLabel.valid.label,
          latitude: DummyLabel.valid.latitude,
          longitude: DummyLabel.valid.longitude
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Incomplete body');
          done();
        })
    })

    it('should not add label with empty coordinates', (done) => {
      chai.request(server)
        .post('/api/setLabel')
        .set('token', token)
        .send({
          id: Id,
          label: DummyLabel.valid.label,
          latitude: null,
          longitude: null
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Incomplete body');
          done();
        })
    })

    it('should not add label with null body', (done) => {
      chai.request(server)
        .post('/api/setLabel')
        .set('token', token)
        .send({
          id: null,
          label: null,
          latitude: null,
          longitude: null
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Incomplete body');
          done();
        })
    })
  })
})
