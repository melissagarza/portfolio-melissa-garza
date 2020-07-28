import {
  EXERCISE_FOCUS,
  EXERCISE_LIST_CLEAR,
  EXERCISE_LIST_ERROR,
  EXERCISE_LIST_LOAD,
  EXERCISE_LIST_NAMES,
  EXERCISE_LOAD,
  EXERCISE_UPLOAD_ERROR,
  EXERCISE_UPLOAD_SUCCESS
} from '../actions/types';

const initialState = {
  exercise: '',
  exerciseNames: [],
  exercises: [],
  exercisesByUser: [],
  loading: true,
  errors: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case EXERCISE_LOAD:
      return {
        ...state,
        exercise: payload,
        loading: true
      };
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
    case EXERCISE_FOCUS:
      return {
        ...state,
        exerciseFocus: payload,
        loading: false
      };
    case EXERCISE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case EXERCISE_LIST_ERROR:
    case EXERCISE_UPLOAD_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    default:
      return state;
  }
};
