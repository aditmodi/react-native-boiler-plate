const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var imageSchema = new Schema({
  img: {
    url: String,
  },
  email: String
})

module.exports = mongoose.model('ImageDB', imageSchema);
