import { REMOVE_NOTIFICATION, ADD_NOTIFICATION } from '../constants';

const initialState = {
  errorMessage: '',
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        error: true,
        errorType: action.payload.errorType,
        errorMessage: action.payload.errorMessage,
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        error: false,
        errorType: '',
        errorMessage: '',
      };
    default:
      return state;
  }
}
