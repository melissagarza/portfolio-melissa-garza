const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  date: {
    type: Date
  },
  name: {
    type: String
  },
  reps: {
    type: Number
  },
  weight: {
    type: mongoose.Schema.Types.Decimal128
  },
  duration: {
    type: mongoose.Schema.Types.Decimal128
  },
  distance: {
    type: mongoose.Schema.Types.Decimal128
  },
  incline: {
    type: mongoose.Schema.Types.Decimal128
  },
  resistance: {
    type: mongoose.Schema.Types.Decimal128
  },
  warmup: {
    type: Boolean,
    default: false
  },
  note: {
    type: String
  },
  multiplier: {
    type: mongoose.Schema.Types.Decimal128
  },
  volume: {
    type: mongoose.Schema.Types.Decimal128
  }
});

const Exercise = mongoose.model('exercise', ExerciseSchema);

module.exports = Exercise;
