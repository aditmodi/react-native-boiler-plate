'use strict';

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

module.exports = mongoose.model('Labels', labelSchema);