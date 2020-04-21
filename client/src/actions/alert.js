import {
  ALERT_ADD,
  ALERT_REMOVE
} from './types';
import { v4 as uuidv4 } from 'uuid';

export const addAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4();

  dispatch({
    type: ALERT_ADD,
    payload: {
      id,
      msg,
      alertType
    }
  });

  setTimeout(() => dispatch({type: ALERT_REMOVE, payload: id}), timeout);
};

export const removeAlert = id => dispatch => {
  dispatch({
    type: ALERT_REMOVE,
    payload: id
  });
};
