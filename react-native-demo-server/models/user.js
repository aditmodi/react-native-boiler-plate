var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define the Schema
var userSchema = new Schema({
  firstName : String,
  lastName : String,
  email : {
    type : String,
    unique : false
  },
  password : String,
  gender : String,
  phone : String
})

//Export mongoose model
module.exports = mongoose.model('Users', userSchema);
