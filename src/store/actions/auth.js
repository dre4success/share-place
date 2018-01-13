import { TRY_AUTH } from './actionTypes';
import { API_KEY } from './api-key';
import { uiStartLoading, uiStopLoading } from './index';
import { startTabs } from '../../screens/startMainTabs';

export const tryAuth = authData => dispatch => {
  dispatch(authSignup(authData));
};

export const authSignup = authData => dispatch => {
  dispatch(uiStartLoading());
  fetch(
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
      API_KEY,
    {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
    .catch(err => {
      console.log(err);
      alert('Authentication failed, please try again');
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
      dispatch(uiStopLoading());
      if (parsedRes.error) {
        if(parsedRes.error.message === 'EMAIL_EXISTS') {
          alert('Email already in use')
        } else {
          alert('Authentication failed, please try again');
        }
      } else {
        startTabs();
      }
    });
};
