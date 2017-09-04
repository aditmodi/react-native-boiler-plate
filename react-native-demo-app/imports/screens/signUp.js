import React, {Component} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
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
    // console.log("fisrt name state : ", this.fname.state.valid);
    // console.log("last name state : ", this.lname.state.valid);
    // console.log("phone state : ", this.phone.state.valid);
    // console.log("gender state : ", this.gender.state.value);
    // console.log("email state : ", this.email.state.valid);
    // console.log("password state : ", this.password.state.valid);
    if (this.fname.state.valid == true && this.lname.state.valid == true && this.email.state.valid == true && this.phone.state.valid == true){
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
      // .then((ref) => {
      //   console.log("ref", ref);
      // })
    //   .then( (response) => response.json())
    // .then(response => {
    //   console.log("dfvgsdugfusdjgujgdsuj",response.token);
    //   AsyncStorage.setItem('@Token:key', response.token);
    //   navigate('Home')
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
      Alert.alert('Form submitted');

      this.fname.clear();
      this.lname.clear();
      this.email.clear();
      this.password.clear();
      this.phone.clear();
      this.cPassword.clear();
    }
    else {
      Alert.alert('Please resolve the errors');
    }
  }

  render(){
    const { navigate } = this.props.navigation;
    return(
      <BackgroundImage>
        <SignUpForm signInPressed={() => navigate('SignIn')}
          handleSubmit={this.submit}
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
