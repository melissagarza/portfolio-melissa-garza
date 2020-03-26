const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true  
  },
  date: {
    type: Date,
    default: Date.now
  },
  alias: {
    type: String
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
