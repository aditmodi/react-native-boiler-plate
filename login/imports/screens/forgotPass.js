import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';

export default class ForgotPassScreen extends Component {
  static navigationOptions = {
    title: 'Password Reset',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behaviour="padding">
        <Text>Enter recovery email :</Text>
        <TextInput/>
        <TouchableOpacity onPress={
          () =>
          navigate('ResetPass')
        }>
          <Text>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}
