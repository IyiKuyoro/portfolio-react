import { USER_AUTH_FAILED, USER_AUTH_STARTED, USER_AUTH_PASSED } from '../constants';

function authStarted() {
  return {
    type: USER_AUTH_STARTED,
  };
}

function authFail() {
  return {
    type: USER_AUTH_FAILED,
  };
}

function authPassed(userData) {
  return {
    type: USER_AUTH_PASSED,
    payload: { ...userData },
  };
}

export function authenticateUser(postData) {
  return (dispatch) => {
    dispatch(authStarted());
    return fetch(
      'http://localhost:4000/api/v1/auth/signin',
      {
        method: 'POST',
        body: postData,
        headers: new Headers(),
      },
    )
      .then((res) => {
        console.log(res);
        // dispatch(authPassed());
        console.log('auth passed');
      })
      .catch(() => {
        dispatch(authFail());
        console.log('auth failed');
      });
  };
}
