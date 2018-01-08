import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

class SideDrawer extends Component {
  render() {
    return <View style={[styles.container, { width: Dimensions.get('window').width * 0.8 }]}>
        <TouchableOpacity>
          <View style={styles.drawItem} >
            <Icon name="md-log-out" size={30} color="#aaa" style={styles.drawItemIcon} />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: 'white',
    flex: 1
  },
  drawItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eee'
  },
  drawItemIcon: {
    marginRight: 10
  }
});

export default SideDrawer;
