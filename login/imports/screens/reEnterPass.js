import React, {Component} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class reEnterPassScreen extends Component {
  render(){
    return(
      <KeyboardAvoidingView behaviour="padding">
        <Text>Enter new password :</Text>
        <TextInput/>
        <Text>Re-Enter new password : </Text>
        <TextInput/>
        <TouchableOpacity>
          <Text>Reset</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}
