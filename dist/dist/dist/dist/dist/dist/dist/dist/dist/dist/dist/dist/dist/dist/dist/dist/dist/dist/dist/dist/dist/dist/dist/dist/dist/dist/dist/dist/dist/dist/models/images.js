'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
  img: {
    url: String
  },
  userId: String,
  // email: String,
  date: Date
});

exports.default = mongoose.model('ImageDB', imageSchema);