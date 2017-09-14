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
        {/* <Button success onPress={this.togglePhoto}>
          <Text>Click to add photos</Text>
        </Button> */}
        {/* <Toggle hidden={this.state.hidden}> */}
          <Button succes>
            <Text>Add from gallery</Text>
          </Button>
          <Button succes onPress={() => navigate('Camera')}>
            <Text>Open camera</Text>
          </Button>
      </View>
    )
  }
}
