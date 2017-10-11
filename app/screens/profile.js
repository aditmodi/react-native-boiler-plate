import React, { Component } from 'react';
import {
  Button,
  Text,
} from 'native-base';
import {
  View,
  StyleSheet,
} from 'react-native';
import HeaderComponent from '../components/headerComponent';
import CameraScreen from './camera';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <HeaderComponent
          leftIcon='arrow-back'
          leftPressed={() => navigate('Home')}
          title='Profile'
        />
        <View style={styles.buttons}>
          <Button success onPress={() => navigate('Camera')} style={styles.button}>
            <Text>Open camera</Text>
          </Button>
          <Button success onPress={() => navigate('Images')} style={styles.button}>
            <Text>Show images</Text>
          </Button>
          <Button success onPress={() => navigate('Maps')} style={styles.button}>
            <Text>Open map</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    top: 40
  },
  button: {
    margin: 20,
    flexDirection: 'row',
    alignSelf: 'center'
  }
});
