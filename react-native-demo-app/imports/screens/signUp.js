import React, {Component} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import SignUpForm from '../components/signUpForm.js';

export default class SignUpScreen extends Component {

  // componentWillMount(){
  //   fetch(`http://192.168.1.189:3001/api`,{
  //     method: 'GET'})
  //   .then((ref) => {
  //     console.log("ref", ref);
  //   })
  //   .catch((error) => {
  //       console.error(error);
  //     });
  // }

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
