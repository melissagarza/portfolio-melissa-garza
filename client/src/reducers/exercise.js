import {
  EXERCISES_FETCHED,
  EXERCISES_CLEARED,
  EXERCISES_ERROR
} from '../actions/types';

const initialState = {
  exercises: [],
  loading: true,
  errors: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case EXERCISES_FETCHED:
      return {
        ...state,
        exercises: payload,
        loading: false
      };
    case EXERCISES_CLEARED:
      return {
        ...state,
        exercises: [],
        loading: false
      };
    case EXERCISES_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    default:
      return state;
  }
};
