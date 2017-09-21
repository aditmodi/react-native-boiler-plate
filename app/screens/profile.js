import React, { Component } from 'react';
import {
  Button,
  Text
} from 'native-base';
import {
  View,
  StyleSheet
} from 'react-native';
import HeaderComponent from '../components/headerComponent';
import CameraScreen from './camera';

export default class ProfileScreen extends Component {

  constructor(props){
    super(props);
  }

  render(){
    const { navigate } = this.props.navigation;
    return(
      <View>
        <HeaderComponent
          leftIcon='arrow-back'
          title='Profile'
        />
          <Button success>
            <Text>Add from gallery</Text>
          </Button>
          <Button success onPress={() => navigate('Camera')}>
            <Text>Open camera</Text>
          </Button>
          <Button success onPress={() => navigate('Images')}>
            <Text>Show images</Text>
          </Button>
      </View>
    )
  }
}
