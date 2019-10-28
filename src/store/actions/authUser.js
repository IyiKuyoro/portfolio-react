import { saveUser, getUser, clearUser } from '../../indexDB/auth';
import {
  USER_AUTH_FAILED,
  USER_AUTH_STARTED,
  SET_CURRENT_USER,
  SET_NO_USER,
} from '../constants';

function authStarted() {
  return {
    type: USER_AUTH_STARTED,
  };
}

function authFail(message) {
  return {
    type: USER_AUTH_FAILED,
    payload: {
      message,
    },
  };
}

function setUser(userData) {
  return {
    type: SET_CURRENT_USER,
    payload: { ...userData },
  };
}

function noUser() {
  return {
    type: SET_NO_USER,
  };
}

export function userLogOut() {
  return (dispatch) => clearUser()
    .then(() => {
      dispatch(noUser());
    })
    .catch(() => {
      console.log('Cannot log user out');
    });
}

export function authenticateUser(postData, history) {
  return (dispatch) => {
    dispatch(authStarted());
    return fetch(
      'http://localhost:4000/api/v1/auth/signin',
      {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success === false) {
          dispatch(authFail(res.message));
        } else {
          // Save user details to indexDB
          saveUser(res.data)
            .then(() => {
              dispatch(setUser(res.data));
              history.push('/');
            })
            .catch(() => {
              throw new Error('Auth failed on client side.');
            });
        }
      })
      .catch((error) => {
        dispatch(authFail(error.message));
      });
  };
}

export function resetUser() {
  return (dispatch) => getUser()
    .then((userData) => {
      if (userData) {
        dispatch(setUser(userData));
      } else {
        dispatch(noUser());
      }
    })
    .catch(() => {
      dispatch(noUser());
    });
}
