import { USER_AUTH_FAILED, USER_AUTH_STARTED, USER_AUTH_PASSED } from '../constants';

const initialState = {
  userData: {},
  isAuthenticated: false,
  loading: false,
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
      };
    case USER_AUTH_PASSED:
      return {
        ...state,
        loading: false,
        userData: action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
}
