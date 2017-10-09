//importing React and Component for extnding it.
//we can also simply import React and then write extends React.Component{}
import React, { Component } from 'react';
import {
  View,                                     //its like div in HTML
  StyleSheet,                               //Component for styling
  Text,                                     //For text
  TextInput,                                //input element
  Button,                                   //button
  Image,                                    //image
  KeyboardAvoidingView,                     //to avoid collapsing of the page when virtual keyboard comes up
  AsyncStorage,                             //Local storage
  Alert                                     //alert box
} from 'react-native';
import LogoContainer from '../components/logoContainer.js'; //first screen logo and title
import LoginForm from '../components/loginForm.js'; //LoginForm having email and password field
import LinearGradient from 'react-native-linear-gradient'; //Library for linear gradient
import BackgroundImage from '../components/background'; // component for background image

const ACCESS_TOKEN = 'access-token';

export default class SignInScreen extends Component {       //extending Component class to enable

  static navigationOptions={
    header : null           //To hide the default navbar of react-navigation
  }

  storeToken = async (accessToken) => {
    try{
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      this.getToken();
    }
    catch(error){
      console.error(error);
    }
  }

  getToken = async() => {
    try{
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log('token is ' + token);
    }
    catch(error){
      console.error(error);
    }
  }

  render(){
    const { navigate } = this.props.navigation;    //to navigate
    //KeyboardAvoidingView is used to avoid when keyboard comes up the field you want to enter your input in.
    return(
        // <LinearGradient style={styles.gradient}>
        <BackgroundImage>
          <KeyboardAvoidingView behaviour="height" style={styles.container}>
            {/* Styling Component with heading and logo */}
            <LogoContainer/>
            {/* To access child's state */}
            <LoginForm
              ref={loginForm => this.login = loginForm}
              buttonPressed={ () => navigate('ForgotPass') }
              signUpPressed={ () => navigate('SignUp') }
              loginPressed={
                () =>{
                  console.log('email entered : ', this.login.state.email);
                  console.log('password entered : ', this.login.state.pass);
                  // when input fields are not null
                  // if (this.login.state.email.length != 0 && this.login.state.pass.length != 0){
                    // using fetch to go this '/authenticate' route
                    fetch('http://192.168.1.189:3001/api/authenticate',{
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      // passing email and password to create token
                      body: JSON.stringify({
                        // session:{
                          email: this.login.state.email,
                          password: this.login.state.pass
                        // }
                      })
                    })
                    .then((response) => response.json())    //converted to JSON
                    .then(response => {
                      console.log("Generated token",response.token);    //token recieved as sessionID
                      this.storeToken(response.token); //using local storage to store token on the client side
                      navigate('Home'); //to navigate to home screen
                    })
                    .catch((error) => {
                      console.error(error);
                    })
                  // }
                  // when input fields are null
                  // else {
                  //   Alert.alert("Please fill in the fields");
                  // }
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
    flexDirection : 'column',           //to define primary axis along which the components will be aligned
    justifyContent : 'space-between',   //along that axis how will content be placed
    alignItems :'stretch'               //look of individual components
  }
})
