const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var imageSchema = new Schema({
  img: {
    url: String,
  },
  userId: String,
  // email: String,
  date: Date
})

export default mongoose.model('ImageDB', imageSchema);
