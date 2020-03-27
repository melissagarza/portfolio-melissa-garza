const csvParse = require('csv-parse');
const { Exercise, User } = require('../models');

const getExercises = async (filters) => {
  return await Exercise.find(filters).populate('user', 'alias -_id').select('-__v');
};

const getExercisesByUser = async (userId, filters) => {
  return await Exercise.find({ user: userId, ...filters }).populate('user', 'alias').select('-__v');
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
        reps: parseInt(record.reps, 10)
      };
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
  getExercisesByUser,
  upload
};
