const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var imageSchema = new Schema({
  img: {
    data: Buffer,
    contentType: String
  }
})

module.exports = mongoose.model('ImageDB', imageSchema);
