import axios from 'axios';
import {
  EXERCISES_FETCHED,
  EXERCISES_CLEARED,
  EXERCISES_ERROR
} from './types';

export const getExercises = () => async dispatch => {
  try {
    const res = await axios.get('/api/exercises');

    dispatch({
      type: EXERCISES_FETCHED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EXERCISES_ERROR,
      payload: {
        status: err.response.status,
        msg: err.response.statusText
      }
    });
  }
};

export const clearExercises = () => async dispatch => {
  dispatch({
    type: EXERCISES_CLEARED
  });
};
