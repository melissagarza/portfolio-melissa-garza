import {
  EXERCISE_LIST_CLEAR,
  EXERCISE_LIST_ERROR,
  EXERCISE_LIST_LOAD,
  EXERCISE_LIST_NAMES
} from '../actions/types';

const initialState = {
  exercises: [],
  exerciseNames: [],
  loading: true,
  errors: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case EXERCISE_LIST_LOAD:
      return {
        ...state,
        exercises: payload,
        loading: false
      };
    case EXERCISE_LIST_NAMES:
      return {
        ...state,
        exerciseNames: payload,
        loading: false
      };
    case EXERCISE_LIST_CLEAR:
      return {
        ...state,
        exercises: [],
        loading: false
      };
    case EXERCISE_LIST_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    default:
      return state;
  }
};
