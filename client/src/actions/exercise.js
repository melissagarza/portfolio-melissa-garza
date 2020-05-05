import axios from 'axios';
import qs from 'qs';
import {
  EXERCISE_LIST_CLEAR,
  EXERCISE_LIST_ERROR,
  EXERCISE_LIST_LOAD,
  EXERCISE_LIST_NAMES,
  EXERCISE_LOAD,
  EXERCISE_UPLOAD_ERROR,
  EXERCISE_UPLOAD_SUCCESS
} from './types';

export const uploadWorkoutHistory = file => async dispatch => {
  try {
    const data = new FormData();
    const config = {
      'Content-Type': 'multipart/form-data'
    };

    data.append('workoutExport', file);

    axios.post('api/exercises/upload', data, config);

    dispatch({ type: EXERCISE_UPLOAD_SUCCESS });
  } catch (err) {
    let payload = {
      status: err.response ? err.response.status : '',
      msg: err.response ? err.response.statusText : err.msg
    };

    dispatch({
      type: EXERCISE_UPLOAD_ERROR,
      payload
    });
  }
};

export const loadExercise = exerciseName => dispatch => {
  dispatch({
    type: EXERCISE_LOAD,
    payload: exerciseName
  });
};

export const loadExercises = (query = null) => async dispatch => {
  try {
    let endpoint = '/api/exercises';

    if (query !== null) {
      endpoint += `?${qs.stringify(query)}`
    }

    const res = await axios.get(endpoint);

    res.data.forEach((exercise, index, exercises) => {
      const exerciseUpdates = {
        weight: parseFloat(exercise.weight.$numberDecimal),
        duration: parseFloat(exercise.duration.$numberDecimal),
        distance: parseFloat(exercise.distance.$numberDecimal),
        incline: parseFloat(exercise.incline.$numberDecimal),
        resistance: parseFloat(exercise.resistance.$numberDecimal),
        multiplier: parseFloat(exercise.multiplier.$numberDecimal),
        volume: parseFloat(exercise.volume.$numberDecimal)
      };
      exercises[index] = { ...exercise, ...exerciseUpdates };
    });

    dispatch({
      type: EXERCISE_LIST_LOAD,
      payload: res.data
    });
  } catch (err) {
    let payload = {
      status: err.response ? err.response.status : '',
      msg: err.response ? err.response.statusText : err.msg
    };

    dispatch({
      type: EXERCISE_LIST_ERROR,
      payload
    });
  }
};

export const loadExerciseNames = () => async dispatch => {
  try {
    const res = await axios.get('/api/exercises/names');

    dispatch({
      type: EXERCISE_LIST_NAMES,
      payload: res.data
    });
  } catch (err) {
    let payload = {
      status: err.response ? err.response.status : '',
      msg: err.response ? err.response.statusText : err.msg
    };

    dispatch({
      type: EXERCISE_LIST_ERROR,
      payload
    });
  }
};

export const clearExercises = () => async dispatch => {
  dispatch({
    type: EXERCISE_LIST_CLEAR
  });
};
