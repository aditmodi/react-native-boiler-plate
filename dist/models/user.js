'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

//define the Schema
var userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    match: /^[a-z0-9]+$/i
  },
  lastName: {
    type: String,
    required: true,
    match: /^[a-z0-9]+$/i
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: {
    type: Buffer,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  }
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameUnique: true
});

//Export mongoose model
exports.default = mongoose.model('Users', userSchema);