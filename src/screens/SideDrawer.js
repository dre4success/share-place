import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { authLogout } from '../store/actions';

class SideDrawer extends Component {
  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get('window').width * 0.8 }
        ]}
      >
        <TouchableOpacity onPress={this.props.authLogout}>
          <View style={styles.drawItem}>
            <Icon
              name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
              size={30}
              color="#aaa"
              style={styles.drawItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
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

export default connect(null, { authLogout })(SideDrawer);
