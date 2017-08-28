import React, {Component} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

export default class reEnterPassScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      valid : false
    }
  }
  render(){
    return(
      <KeyboardAvoidingView behaviour="padding">
        <Text>Enter new password :</Text>
        <TextInput/>
        <Text>Re-Enter new password :</Text>
        <TextInput/>
        <TouchableOpacity
          onPress={
            () => {
              if (this.state.valid == true){
                Alert.alert('Your password has been reset!!')
              }
              else {
                Alert.alert('Session Expired!!')
              }
            }
          }
          >
          <Text>Reset</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}
