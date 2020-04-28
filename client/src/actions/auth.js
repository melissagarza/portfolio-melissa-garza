import axios from 'axios';
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REGISTER_SUCCESS,
  AUTH_USER_LOAD
} from './types';
import { addAlert } from './alert';

export const register = ({ username, password}) => async dispatch => {
  try {
    const data = JSON.stringify({ username, password });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/users', data, config);

    dispatch({
      type: AUTH_REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(addAlert(error.msg, 'danger')));
    }

    dispatch({
      type: AUTH_LOGOUT
    });
  }
};

export const login = ({ username, password }) => async dispatch => {
  try {
    const data = JSON.stringify({ username, password });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/auth', data, config);

    dispatch({
      type: AUTH_LOGIN,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(addAlert(error.msg, 'danger')));
    }

    dispatch({
      type: AUTH_LOGOUT
    }); 
  }
};

export const loadUser = () => async (dispatch, getState) => {
  const { token } = getState().auth;

  if (token) {
    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: AUTH_USER_LOAD,
        payload: res.data
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(addAlert(error.msg, 'danger')));
      }

      dispatch({
        type: AUTH_LOGOUT
      });
    }
  }
};
