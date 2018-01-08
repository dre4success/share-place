import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

export const startTabs = async () => {
  const [find, share] = await Promise.all([
    Icon.getImageSource('md-map', 30),
    Icon.getImageSource('md-share', 30)
  ]);

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'awesome-places.SharePlaceScreen',
        label: 'Share Place',
        title: 'Share Place',
        icon: share
      },
      {
        screen: 'awesome-places.FindPlaceScreen',
        label: 'Find Place',
        title: 'Find Place',
        icon: find
      }
    ]
  });
};
