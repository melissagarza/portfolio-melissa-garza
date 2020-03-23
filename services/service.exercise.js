const { Exercise } = require('../models');

const getExercises = async () => {
  return await Exercise.find();
};

const getExercise = async idExercise => {
  return await Exercise.findById(idExercise);
};

module.exports = {
  getExercises,
  getExercise
};
