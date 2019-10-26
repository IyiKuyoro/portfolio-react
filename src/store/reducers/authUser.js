import {
  USER_AUTH_FAILED,
  USER_AUTH_STARTED,
  SET_CURRENT_USER,
  SET_NO_USER,
} from '../constants';

const initialState = {
  userData: {},
  isAuthenticated: false,
  loading: false,
  errorMessage: '',
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_AUTH_STARTED:
      return {
        ...state,
        loading: true,
      };
    case USER_AUTH_FAILED:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.message,
        error: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        loading: false,
        userData: action.payload,
        isAuthenticated: true,
      };
    case SET_NO_USER:
      return {
        ...state,
        userData: {},
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
