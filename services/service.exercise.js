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
    columns: ['date', 'name', 'sets', 'reps', 'weight', 'warmup', 'note'],
    from_line: 2
  });

  csvStream.on('readable', () => {
    let record;

    while (record = csvStream.read()) {
      const recordUpdates = {
        user: userId,
        date: new Date(record.date),
        sets: parseInt(record.sets, 10),
        reps: parseInt(record.reps, 10),
        weight: parseInt(record.weight, 10),
        warmup: !!(record.warmup)
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
