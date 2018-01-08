import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

import { startTabs } from './startMainTabs';
import { DefaultInput } from '../components/UI/DefaultInput';

class AuthScreen extends Component {
  loginHandler = () => {
    startTabs();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Please LogIN</Text>
        <Button title="Switch to Login" />

        <View style={styles.inputContainer}>
          <DefaultInput placeholder="Your Email Address" />
          <DefaultInput placeholder="Password" />
          <DefaultInput placeholder="Confirm Password" />
        </View>
        <Button title="Login" onPress={this.loginHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%'
  }
});

export default AuthScreen;
