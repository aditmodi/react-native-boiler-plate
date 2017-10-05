const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var labelSchema = new Schema({
  userId: String,
  label: String,
  coord: {
    latitude: Number,
    longitude: Number
  }
})

export default mongoose.model('Labels', labelSchema);
