import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addPlace = (placeName, location, image) => dispatch => {
  dispatch(uiStartLoading());
  fetch(
    'https://us-central1-places-awesome-1515590111232.cloudfunctions.net/storeImage',
    {
      method: 'POST',
      body: JSON.stringify({
        image: image.base64
      })
    }
  )
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
    .catch(err => {
      console.log(err);
      alert('Something went wrong, please try again!');
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
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
  fetch('https://places-awesome-1515590111232.firebaseio.com/places.json')
    .catch(err => {
      alert('Something went wrong, sorry 🙇‍♀️');
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
    });
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key
  };
};

export const deletePlace = key => dispatch => {
  dispatch(removePlace(key));
  fetch(
    'https://places-awesome-1515590111232.firebaseio.com/places/' +
      key +
      '.json',
    {
      method: 'DELETE'
    }
  )
    .catch(err => {
      alert('Something went wrong, sorry :/');
      console.log(err);
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log('Done!');
    });
};
