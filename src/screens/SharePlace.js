import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../store/actions/index';
import PlaceInput from '../components/PlaceInput';
import { MainText } from '../components/UI/MainText';
import { HeadingText } from '../components/UI/HeadingText';
import PickImage from '../components/Pick/PickImage';
import PickLocation from '../components/Pick/PickLocation';
import { validate } from '../utils/validate';

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  };

  state = {
    controls: {
      placeName: {
        value: '',
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      },
      location: {
        value: null,
        valid: false
      },
      image: {
        value: null,
        valid: false
      }
    }
  };
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left'
        });
      }
    }
  };

  locationPickedHandler = location => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        location: {
          value: location,
          valid: true
        }
      }
    }));
  };

  placeNameChangeHandler = val => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        placeName: {
          ...prevState.controls.placeName,
          value: val,
          valid: validate(val, prevState.controls.placeName.validationRules),
          touched: true
        }
      }
    }));
  };

  placeAddedHanlder = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value
    );
  };

  imagePickedHandler = image => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        image: {
          value: image,
          valid: true
        }
      }
    }));
  };

  render() {
    let submitButton = (
      <Button
        title="Share the Place!"
        onPress={this.placeAddedHanlder}
        disabled={
          !this.state.controls.placeName.valid ||
          !this.state.controls.location.valid ||
          !this.state.controls.image.valid
        }
      />
    );

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          <PickImage onImagePicked={this.imagePickedHandler} />
          <PickLocation onLocationPick={this.locationPickedHandler} />
          <PlaceInput
            placeName={this.state.controls.placeName.value}
            onChangeText={this.placeNameChangeHandler}
          />
          <View style={styles.button}>{submitButton}</View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) =>
      dispatch(addPlace(placeName, location, image))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
