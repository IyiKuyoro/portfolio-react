import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants';

export function addNotification(errorMessage, errorType = 'anchor') {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      errorMessage,
      errorType,
    },
  };
}

export function removeNotification() {
  return {
    type: REMOVE_NOTIFICATION,
  };
}
