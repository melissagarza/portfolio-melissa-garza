const mongoose = require('mongoose');

const ExerciseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  sets: {
    type: Number
  },
  reps: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    default: 0
  },
  warmup: {
    type: Boolean,
    default: false
  },
  note: {
    type: String
  }
});

const Exercise = mongoose.model('exercise', ExerciseSchema);

module.exports = Exercise;
