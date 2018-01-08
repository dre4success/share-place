import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import AuthScreen from './src/screens/Auth';

import SharePlaceScreen from './src/screens/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace';
import configureStore from './src/store/configureStore';
import PlaceDetailScreen from './src/screens/PlaceDetail';

const store = configureStore();

// Register Screens
Navigation.registerComponent(
  'awesome-places.AuthScreen',
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'awesome-places.SharePlaceScreen',
  () => SharePlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'awesome-places.FindPlaceScreen',
  () => FindPlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'awesome-places.PlaceDetailScreen',
  () => PlaceDetailScreen,
  store,
  Provider
);

// Start App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'awesome-places.AuthScreen',
    title: 'Login'
  }
});
