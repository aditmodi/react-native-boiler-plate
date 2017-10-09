import React, {Component} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,                           //component for customised button
  Text,
  Alert,
  AsyncStorage
} from 'react-native';
import SignUpForm from '../components/signUpForm.js';
import BackgroundImage from '../components/background';

export default class SignUpScreen extends Component {

  static navigationOptions={
    header : null
  }

  submit = () => {
    const { navigate } = this.props.navigation;
    //when entered values are valid
    if (this.fname.state.valid == true && this.lname.state.valid == true && this.email.state.valid == true && this.phone.state.valid == true){
      //going to route '/users' to add new user
      fetch('http://192.168.1.189:3001/api/users',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: this.fname.state.value,
          lname: this.lname.state.value,
          email: this.email.state.value,
          password: this.password.state.value,
          phone: this.phone.state.value,
          gender: this.gender.state.value
        })
      })
      //going to route '/authenticate' to generate token for the new user and automatically redirect him to home page
    .then(() => {
      fetch('http://192.168.1.189:3001/api/authenticate',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email.state.value,
          password: this.password.state.value
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
    })
    .catch((error) => {
      console.error(error);
    });
    //to alert the user
    Alert.alert('Form submitted');

    //to clear the form after submitting
    this.fname.clear();
    this.lname.clear();
    this.email.clear();
    this.password.clear();
    this.phone.clear();
    this.cPassword.clear();
    }
    else {
      // when some value is not valid
      Alert.alert('Please resolve the errors');
    }
  }

  render(){
    const { navigate } = this.props.navigation;         //For navigation
    return(
      <BackgroundImage>
        <SignUpForm signInPressed={() => navigate('SignIn')}
          handleSubmit={this.submit}
          //props of ref - fname, lname, email, password, cPassword, phone, gender
          fname={(input) => {this.fname = input}}
          lname={(input) => {this.lname = input}}
          email={(input) => {this.email = input}}
          password={(input) => {this.password = input}}
          cPassword={(input) => {this.cPassword = input}}
          phone={(input) => {this.phone = input}}
          gender={(input) => {this.gender = input}}
        />
      </BackgroundImage>
    )
  }
}
