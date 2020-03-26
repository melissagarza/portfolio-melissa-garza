const { serviceExercise } = require('../services');

const getExercises = async (req, res) => {
  try {
    const exercises = await serviceExercise.getExercises(req.query);
    res.send(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

const getExercisesByUser = async (req, res) => {
  try {
    const exercises = await serviceExercise.getExercisesByUser(req.user.id, req.query);
    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

const upload = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: 'No files were uploaded' });
    }
    const file = req.files.workoutExport;
    
    if (file.mimetype !== 'text/csv') return res.status(415).json({ msg: 'File must be of type text/csv' });

    await serviceExercise.upload(file, req.user.id);

    res.json({
      success: true,
      msg: 'File successfully uploaded'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getExercises,
  getExercisesByUser,
  upload
};
