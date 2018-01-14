import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const addPlace = (placeName, location, image) => dispatch => {
  dispatch(uiStartLoading());
  dispatch(authGetToken())
    .catch(() => {
      alert('No valid token found');
    })
    .then(token => {
      return fetch(
        'https://us-central1-places-awesome-1515590111232.cloudfunctions.net/storeImage',
        {
          method: 'POST',
          body: JSON.stringify({
            image: image.base64
          })
        }
      );
    })
    .catch(err => {
      console.log(err);
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
      const placeData = {
        name: placeName,
        location,
        image: parsedRes.imageUrl
      };
      return fetch(
        'https://places-awesome-1515590111232.firebaseio.com/places.json',
        {
          method: 'POST',
          body: JSON.stringify(placeData)
        }
      );
    })

    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
      dispatch(uiStopLoading());
    })
    .catch(err => {
      console.log(err);
      alert('Something went wrong, please try again!');
      dispatch(uiStopLoading());
    });
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
    .then(res => res.json())
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
    .then(res => res.json())
    .then(parsedRes => {
      console.log('Done!');
    })
    .catch(err => {
      alert('Something went wrong, sorry :/');
      console.log(err);
    });
};
