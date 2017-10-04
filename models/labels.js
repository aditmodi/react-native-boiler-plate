const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var labelSchema = new Schema({
  email: String,
  label: String,
  coord: {
    latitude: Number,
    longitude: Number
  }
})

module.exports = mongoose.model('Labels', labelSchema);
