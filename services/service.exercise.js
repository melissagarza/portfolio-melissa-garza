const { Exercise } = require('../models');

const getExercises = async () => {
  return await Exercise.find();
};

module.exports = {
  getExercises
};
