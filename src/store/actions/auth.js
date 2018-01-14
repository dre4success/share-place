import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import { API_KEY } from './api-key';
import { uiStartLoading, uiStopLoading } from './index';
import { startTabs } from '../../screens/startMainTabs';

export const tryAuth = (authData, authMode) => dispatch => {
  dispatch(uiStartLoading());
  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
  if (authMode === 'signup') {
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
  }
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .catch(err => {
      console.log(err);
      alert('Authentication failed, please try again');
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
      dispatch(uiStopLoading());
      if (!parsedRes.idToken) {
        if (parsedRes.error.message === 'EMAIL_EXISTS') {
          alert('Email already in use');
        } else {
          alert('Authentication failed, please try again');
        }
      } else {
        dispatch(authSetToken(parsedRes.idToken));
        startTabs();
      }
    });
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token
  };
};

export const authGetToken = () => (dispatch, getState) => {
  const promise = new Promise((resolve, reject) => {
    const token = getState().auth.token;
    if (!token) {
      reject();
    } else {
      resolve(token);
    }
  });
  return promise;
};
