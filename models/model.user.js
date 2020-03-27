const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true  
  },
  alias: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  dateOfLastExercise: {
    type: Date,
    default: '2000-01-01T00:00:00.000+00:00'
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
