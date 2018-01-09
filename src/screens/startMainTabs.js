import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const startTabs = async () => {
  const [find, share, menu] = await Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
    Icon.getImageSource(
      Platform.OS === 'android' ? 'md-share' : 'ios-share',
      30
    ),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
  ]);

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'awesome-places.SharePlaceScreen',
        label: 'Share Place',
        title: 'Share Place',
        icon: share,
        navigatorButtons: {
          leftButtons: [
            {
              icon: menu,
              title: 'Menu',
              id: 'sideDrawerToggle'
            }
          ]
        }
      },
      {
        screen: 'awesome-places.FindPlaceScreen',
        label: 'Find Place',
        title: 'Find Place',
        icon: find,
        navigatorButtons: {
          leftButtons: [
            {
              icon: menu,
              title: 'Menu',
              id: 'sideDrawerToggle'
            }
          ]
        }
      }
    ],
    tabsStyle: {
      tabBarSelectedButtonColor: 'orange'
    },
    appStyle: {
      tabBarSelectedButtonColor: 'orange'
    },
    drawer: {
      left: {
        screen: 'awesome-places.SideDrawerScreen'
      }
    }
  });
};
