const { serviceExercise } = require('../services');

const getExercises = async (req, res) => {
  try {
    const exercises = await serviceExercise.getExercises();
    res.send(exercises);
  } catch (err) {
    console.error(err.message);
    res.send(`Error: ${err.message}`);
  }
};

module.exports = {
  getExercises
};
