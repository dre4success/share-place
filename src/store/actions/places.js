import {
  SET_PLACES,
  REMOVE_PLACE,
  PLACE_ADDED,
  START_ADD_PLACE
} from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE
  };
};

export const addPlace = (placeName, location, image) => dispatch => {
  let authToken;
  dispatch(uiStartLoading());
  dispatch(authGetToken())
    .catch(() => {
      alert('No valid token found');
    })
    .then(token => {
      authToken = token;
      return fetch(
        'https://us-central1-places-awesome-1515590111232.cloudfunctions.net/storeImage',
        {
          method: 'POST',
          body: JSON.stringify({
            image: image.base64
          }),
          headers: {
            Authorization: 'Bearer ' + authToken
          }
        }
      );
    })
    .catch(err => {
      console.log(err);
      dispatch(uiStopLoading());
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then(parsedRes => {
      const placeData = {
        name: placeName,
        location,
        image: parsedRes.imageUrl,
        imagePath: parsedRes.imagePath
      };
      return fetch(
        'https://places-awesome-1515590111232.firebaseio.com/places.json?auth=' +
          authToken,
        {
          method: 'POST',
          body: JSON.stringify(placeData)
        }
      );
    })

    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then(parsedRes => {
      console.log(parsedRes);
      dispatch(uiStopLoading());
      dispatch(placeAdded());
    })
    .catch(err => {
      console.log(err);
      alert('Something went wrong, please try again!');
      dispatch(uiStopLoading());
    });
};

export const placeAdded = () => {
  return {
    type: PLACE_ADDED
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places
  };
};

export const getPlaces = () => dispatch => {
  dispatch(authGetToken())
    .then(token =>
      fetch(
        'https://places-awesome-1515590111232.firebaseio.com/places.json?auth=' +
          token
      )
    )
    .catch(() => {
      alert('No valid token found');
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then(parsedRes => {
      const places = [];
      for (let key in parsedRes) {
        places.push({
          ...parsedRes[key],
          image: {
            uri: parsedRes[key].image
          },
          key
        });
      }
      dispatch(setPlaces(places));
    })
    .catch(err => {
      alert('Something went wrong, sorry 🙇‍♀️');
    });
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key
  };
};

export const deletePlace = key => dispatch => {
  dispatch(authGetToken())
    .catch(() => {
      alert('No valid token found');
    })
    .then(token => {
      dispatch(removePlace(key));
      return fetch(
        'https://places-awesome-1515590111232.firebaseio.com/places/' +
          key +
          '.json?auth=' +
          token,
        {
          method: 'DELETE'
        }
      );
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then(parsedRes => {
      console.log('Done!');
    })
    .catch(err => {
      alert('Something went wrong, sorry :/');
      console.log(err);
    });
};
