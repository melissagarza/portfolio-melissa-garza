import { combineReducers } from 'redux';
import alert from './alert';
import exercise from './exercise';

export default combineReducers({
  alert,
  exercise
});
