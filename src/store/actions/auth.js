import { AsyncStorage } from 'react-native';
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
        dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn));
        startTabs();
      }
    });
};

export const authStoreToken = (token, expiresIn) => dispatch => {
  dispatch(authSetToken(token));
  const now = new Date();
  const expiryDate = now.getTime() + expiresIn * 1000;
  console.log(now, new Date(expiryDate), expiryDate, expiresIn);
  AsyncStorage.setItem('ap:auth:token', token);
  AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString());
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token
  };
};

// For auto signin
export const authGetToken = () => (dispatch, getState) => {
  const promise = new Promise((resolve, reject) => {
    const token = getState().auth.token;
    // if there's no token in our reducer
    if (!token) {
      let fetchedToken;

      // try and get it from AsyncStorage a.k.a locastorage
      AsyncStorage.getItem('ap:auth:token')
        .catch(err => reject())
        .then(tokenFromStorage => {
          fetchedToken = tokenFromStorage;
          if (!tokenFromStorage) {
            // then if there's no token from storage, reject and return
            reject();
            return;
          }
          return AsyncStorage.getItem('ap:auth:expiryDate');
        })
        .then(expiryDate => {
          const parsedExpiryDate = new Date(parseInt(expiryDate));
          const now = new Date();
          if (parsedExpiryDate > now) {
            dispatch(authSetToken(fetchedToken));
            resolve(fetchedToken);
          } else {
            reject();
          }
        })
        .catch(err => reject());
    } else {
      resolve(token);
    }
  });
  promise.catch(err => {
    dispatch(authClearStorage);
  });
  return promise;
};

export const authAutoSignin = () => dispatch => {
  dispatch(authGetToken())
    .then(token => {
      startTabs();
    })
    .catch(err => console.log('Failed to fetch token!'));
};

export const authClearStorage = () => dispatch => {
  AsyncStorage.removeItem('ap:auth:token');
  AsyncStorage.removeItem('ap:auth:expiryDate');
};
