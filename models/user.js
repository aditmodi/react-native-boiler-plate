var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

//define the Schema
var userSchema = new Schema({
  firstName : String,
  lastName : String,
  email : {
    type : String,
    unique : true
  },
  password : Buffer,
  gender : String,
  phone : String
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameUnique: true
});

//Export mongoose model
module.exports = mongoose.model('Users', userSchema);
