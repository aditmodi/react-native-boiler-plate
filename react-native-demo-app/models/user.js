var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define the Schema
var userSchema = new Schema({
  fistName : String,
  lastName : String,
  email : {
    type : String,
    unique : false
  },
  password : String,
  gender : String,
  phone : Number
})

//Export mongoose model
module.exports = mongoose.model('Users', userSchema);
