import React, { Component } from 'react';
// import LoginForm from '../components/loginForm.js';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import LogoContainer from '../components/logoContainer.js';
import LoginForm from '../components/loginForm.js';
import LinearGradient from 'react-native-linear-gradient';

export default class SignInScreen extends Component {

  static navigationOptions = {
    header : null
  }

  render(){
    const { navigate } = this.props.navigation;
    return(
        <LinearGradient colors={['#00bfff', '#87cefa', '#ba55d3']} style={styles.gradient}>
          <KeyboardAvoidingView behaviour="height" style={styles.container}>
            <LogoContainer image={require('../img/react-native-logo.png')}/>
            <LoginForm buttonPressed={
              () =>
              navigate('ForgotPass')
            }
            signUpPressed={
              () =>
              navigate('SignUp')
            }
            loginPressed={
              () =>
              navigate('Home')
            }
            />
            </KeyboardAvoidingView>
        </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    // flexDirection : 'column',
    // justifyContent : 'space-between',
    // alignItems : 'center'
  },
  gradient : {
    flex : 1,
    flexDirection : 'column',
    justifyContent : 'space-between',
    alignItems :'stretch'
  }
})
