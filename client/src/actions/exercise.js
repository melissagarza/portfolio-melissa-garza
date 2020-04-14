import axios from 'axios';
import qs from 'qs';
import {
  EXERCISE_LOAD,
  EXERCISE_LIST_CLEAR,
  EXERCISE_LIST_ERROR,
  EXERCISE_LIST_LOAD,
  EXERCISE_LIST_NAMES
} from './types';

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
      endpoint = `${endpoint}?${qs.stringify(query)}`
    }

    const res = await axios.get(endpoint);

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
