'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var labelSchema = new Schema({
  userId: String,
  label: String,
  coord: {
    latitude: Number,
    longitude: Number
  }
});

exports.default = mongoose.model('Labels', labelSchema);