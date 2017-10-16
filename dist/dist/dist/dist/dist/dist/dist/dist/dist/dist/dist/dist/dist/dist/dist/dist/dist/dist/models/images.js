'use strict';

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

module.exports = mongoose.model('ImageDB', imageSchema);