import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground
} from 'react-native';

import { startTabs } from './startMainTabs';
import { DefaultInput } from '../components/UI/DefaultInput';
import { HeadingText } from '../components/UI/HeadingText';
import { MainText } from '../components/UI/MainText';
import backgroundImage from '../assets/background.jpg';

class AuthScreen extends Component {
  loginHandler = () => {
    startTabs();
  };
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Please Log in</HeadingText>
          </MainText>
          <Button title="Switch to Login" />

          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your Email Address"
              style={styles.input}
            />
            <DefaultInput placeholder="Password" style={styles.input} />
            <DefaultInput placeholder="Confirm Password" style={styles.input} />
          </View>
          <Button title="Login" onPress={this.loginHandler} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  }
});

export default AuthScreen;
