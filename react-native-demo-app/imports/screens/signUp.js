import React, {Component} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import SignUpForm from '../components/signUpForm.js';

export default class SignUpScreen extends Component {

  static navigationOptions={
    header : null
  }
  render(){
    const { navigate } = this.props.navigation;
    return(
        <SignUpForm signInPressed={() => navigate('SignIn')}/>
    )
  }
}
