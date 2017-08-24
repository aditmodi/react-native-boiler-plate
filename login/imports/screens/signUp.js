import React, {Component} from 'react';
import {
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import SignUpForm from '../components/signUpForm.js';

export default class SignUpScreen extends Component {
  static navigationOptions = {
    title : 'Sign Up Form'
  }
  render(){
    return(
      <SignUpForm/>
    )
  }
}
