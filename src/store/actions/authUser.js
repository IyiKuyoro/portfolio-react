import config from '../../config';
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

export function userLogOut(history) {
  const forbiddenPaths = ['/write'];

  return (dispatch) => {
    localStorage.removeItem('user');
    dispatch(noUser());
    if (forbiddenPaths.indexOf(history.location.pathname) >= 0) {
      history.push('/');
    }
  };
}

export function authenticateUser(postData, history) {
  const { push, location: { state } } = history;

  return (dispatch) => {
    dispatch(authStarted());
    return fetch(
      `${config.backendUrl}/auth/signin`,
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
          localStorage.setItem('user', JSON.stringify(res.data));
          dispatch(setUser(res.data));
          if (state.errorMessage) {
            push(state.prevPath);
          } else {
            push('/');
          }
        }
      })
      .catch((error) => {
        dispatch(authFail(error.message));
      });
  };
}

export function resetUser() {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(noUser());
    }
  };
}
