import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View
} from 'react-native';

export default class MidWayScreen extends Component {

  static navigationOptions = {
    header: null
  }

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
