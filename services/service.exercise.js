const csvParse = require('csv-parse');
const { Exercise } = require('../models');

const getExercises = async () => {
  return await Exercise.find();
};

const getExercise = async idExercise => {
  return await Exercise.findById(idExercise);
};

const upload = async (file, userId) => {
  const exercisesToSave = [];

  const csvStream = csvParse({
    columns: [
      'date',
      'name',
      'reps',
      'weight',
      'duration',
      'distance',
      'incline',
      'resistance',
      'warmup',
      'note',
      'multiplier'
    ],
    from_line: 2,
    skip_lines_with_error: true
  });

  csvStream.on('readable', () => {
    let record;

    while (record = csvStream.read()) {
      const recordUpdates = {
        user: userId,
        date: new Date(record.date),
        reps: parseInt(record.reps, 10)
      };
      const updatedRecord = {...record, ...recordUpdates};
      exercisesToSave.push(updatedRecord);
    }
  });

  csvStream.on('error', err => {
    throw new Error(err.message);
  });

  csvStream.on('end', async () => {
    return await Exercise.insertMany(exercisesToSave);
  });

  csvStream.write(file.data);
  csvStream.end();
};

module.exports = {
  getExercises,
  getExercise,
  upload
};
