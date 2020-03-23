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

const getExercise = async (req, res) => {
  try {
    const exercise = serviceExercise.getExercise(req.params.exercise_id);
    res.json(exercise);
  } catch (err) {
    console.error(err.message);
    res.send(`Error: ${err.message}`);
  }
};

const upload = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: 'No files were uploaded' });
    }
    const file = req.files.fitbodWorkout;
    
    if (file.mimetype !== 'text/csv') return res.status(415).json({ msg: 'File must be of type text/csv' });

    console.log(file);

    res.json({
      success: true,
      msg: 'File successfully upload'
    });
  } catch (err) {
    console.error(err.message);
    res.send(`Error: ${err.message}`);
  }
};

module.exports = {
  getExercises,
  getExercise,
  upload
};
