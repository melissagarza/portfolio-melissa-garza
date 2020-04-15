const csvParse = require('csv-parse');
const { Exercise, User } = require('../models');

const getExercises = async (filters) => {
  return await Exercise.find(filters).populate('user', 'alias -_id').select('-__v');
};

const getExerciseNames = async () => {
  return await Exercise.distinct('name', (err, res) => {
    if (err) throw new Error(err.message);
    return res;
  });
};

const getExercisesByUser = async (userId, filters) => {
  return await Exercise.find({ user: userId, ...filters }).populate('user', 'alias').select('-__v');
};

const getExerciseNamesByUser = async (userId) => {
  return await Exercise.distinct('name', { user: userId }, (err, res) => {
    if (err) throw new Error(err.message);
    return res;
  });
};

const upload = async (file, userId) => {
  const newExercises = [];
  const user = await User.findById(userId);
  if (!user) throw new Error('User does not exist');
  const userDateOfLastExercise = new Date(user.dateOfLastExercise);

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

  csvStream.on('readable', async () => {
    let record;

    while (record = csvStream.read()) {
      const recordUpdates = {
        user: userId,
        date: new Date(record.date),
        reps: parseInt(record.reps, 10),
        weight: parseFloat(record.weight, 10),
        duration: parseFloat(record.duration, 10),
        distance: parseFloat(record.distance, 10),
        incline: parseFloat(record.incline, 10),
        resistance: parseFloat(record.resistance, 10),
        multiplier: parseFloat(record.multiplier, 10)
      };

      recordUpdates.volume = recordUpdates.reps * recordUpdates.weight;

      const updatedRecord = {...record, ...recordUpdates};

      if (updatedRecord.date > userDateOfLastExercise) {
        newExercises.push(updatedRecord);
      }
    }
  });

  csvStream.on('error', err => {
    throw new Error(err.message);
  });

  csvStream.on('end', async () => {
    if (newExercises.length > 0) {
      const lastExerciseDate = new Date(newExercises[0].date);
  
      if (userDateOfLastExercise < lastExerciseDate) {
        user.dateOfLastExercise = lastExerciseDate;
        await user.save();
      }
  
      return await Exercise.insertMany(newExercises);
    }
    return;
  });

  csvStream.write(file.data);
  csvStream.end();
};

module.exports = {
  getExercises,
  getExerciseNames,
  getExercisesByUser,
  getExerciseNamesByUser,
  upload
};
