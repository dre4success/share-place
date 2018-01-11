import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => dispatch => {
  const placeData = {
    name: placeName,
    location
  };

     fetch(
    'https://us-central1-places-awesome-1515590111232.cloudfunctions.net/storeImage',
    {
      method: 'POST',
      body: JSON.stringify({
        image: image.base64
      })
    
  )
    .catch(err => console.log(err))
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
    }); 

  /* fetch('https://places-awesome-1515590111232.firebaseio.com/places.json', {
    method: 'POST',
    body: JSON.stringify(placeData)
  })
    .catch(err => console.log(err))
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
    }); */
  /*    const res = await fetch('https://places-awesome-1515590111232.firebaseio.com/places.json', {
      method: 'POST',
      body: JSON.stringify(placeData)
    }) */
};

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    payload: key
  };
};
