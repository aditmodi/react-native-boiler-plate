//importing React and Component for extnding it.
//we can also simply import React and then write extends React.Component{}
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import LogoContainer from '../components/logoContainer.js'; //first screen logo and title
import LoginForm from '../components/loginForm.js'; //LoginForm having email and password field
import LinearGradient from 'react-native-linear-gradient'; //Library for linear gradient
import BackgroundImage from '../components/background';

export default class SignInScreen extends Component {

  static navigationOptions={
    header : null           //To hide the default navbar of react-navigation
  }

  render(){
    const { navigate }= this.props.navigation;    //to navigate
    //KeyboardAvoidingView is used to avoid when keyboard comes up the field you want to enter your input in.
    return(
        // <LinearGradient style={styles.gradient}>
        <BackgroundImage>
          <KeyboardAvoidingView behaviour="height" style={styles.container}>
            <LogoContainer image={require('../img/react-native-logo.png')}/>
            <LoginForm
              // refs={(input) => {this.login = input}}
              // email={(input) => {this.email = input}}
              // password={(input) => {this.password = input}}
              ref={loginForm => this.login = loginForm}
              buttonPressed={
                () => navigate('ForgotPass')
              }
              signUpPressed={
                () => navigate('SignUp')
              }
              loginPressed={

                () =>{
                  console.log('emailAfter : ', this.login.state.email);
                  console.log('emailAfter : ', this.login.state.pass);
                  // navigate('Home')
                  fetch('http://192.168.1.189:3001/api/authenticate',{
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: this.login.state.email,
                      password: this.login.state.pass
                    })
                  })
                  .then( (response) => response.json())
                .then(response => {
                  console.log("dfvgsdugfusdjgujgdsuj",response.token);
                  AsyncStorage.setItem('@Token:key', response.token);
                  navigate('Home')
                })
                  .catch((error) => {
                    console.error(error);
                  })

                }
              }
            />
            </KeyboardAvoidingView>
        </BackgroundImage>

        // </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,          //expands according to the size of parent
  // },
  // gradient : {
  //   flex : 1,
    flexDirection : 'column',           //to define primary axis along which the components will be aligned
    justifyContent : 'space-between',   //along that axis how will content be placed
    alignItems :'stretch'               //look of individual components
  }
})
