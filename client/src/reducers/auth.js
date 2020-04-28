import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REGISTER_SUCCESS,
  AUTH_USER_LOAD
} from '../actions/types';

const initialState = {
  token: '',
  isAuthenticated: null,
  loading: true,
  user: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_LOGIN:
    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case AUTH_USER_LOAD:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
};
