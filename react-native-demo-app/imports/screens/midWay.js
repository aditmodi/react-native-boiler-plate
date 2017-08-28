import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class MidWayScreen extends Component {


  render(){
    const { navigate } = this.props.navigation;
    return(
      <TouchableOpacity
        onPress={
          () => {
            navigate('ResetPass')
          }
        }
        >
        <Text>Click here to reset your password</Text>
      </TouchableOpacity>
    )
  }
}
