// Creating a component for sign up Form

import React, {Component} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';
import InputValidation from './inputValidation.js';
import { Form } from './signUpFormDetails.js';
import LinearGradient from 'react-native-linear-gradient';
import GenderRadio from './genderRadio.js';

export default class SignUpForm extends Component {

  constructor(props){
    super(props);
  }

  handleSubmit = () => {
    console.log("fisrt name state : ", this.fname.state.valid);
    console.log("last name state : ", this.lname.state.valid);
    console.log("phone state : ", this.phone.state.valid);
    console.log("gender state : ", this.gender.state.value);
    console.log("email state : ", this.email.state.valid);
    console.log("password state : ", this.password.state.valid);
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
      .then((ref) => {
        console.log("ref", ref);
      })
      .catch((error) => {
        console.error(error);
        });
      Alert.alert('Form submitted');
      fetch('http://192.168.1.189:3001/api/authenticate')
      .then((token) => {
        console.log("token:", token);
      })
      .catch((error) => {
        console.error(error);
      })
      this.fname.clear();
      this.lname.clear();
      this.email.clear();
      this.password.clear();
      this.phone.clear();
      this.cPassword.clear();
      fetch('http://192.168.1.189:3001/api/authenticate')
      .then((token) => {
        console.log("token:", token);
      })
      .catch((error) => {
        console.error(error);
      })
    }
    else {
      Alert.alert('Please resolve the errors');
    }
  }

  render(){
    return(
      <LinearGradient colors={['#00bfff', '#87cefa', '#ba55d3']} style={styles.gradient}>
        <ScrollView>
          <KeyboardAvoidingView behaviour="padding">
            <InputValidation
              type="text"
              placeHolder="First Name"
              ref={(input) => {this.fname = input}}
            />
            <InputValidation
              type="text"
              placeHolder="Last Name"
              ref={(input) => {this.lname = input}}
            />
            <InputValidation
              type="email"
              placeHolder="email"
              ref={(input) => {this.email = input}}
            />
            <InputValidation
              type="password"
              placeHolder="Password"
              ref={(input) => {this.password = input}}
              secure
            />
            <InputValidation
              type="confirmPassword"
              placeHolder="Confirm Password"
              ref={(input) => {this.cPassword = input}}
              secure
            />
            <GenderRadio
              ref={(input) => {this.gender = input}}
            />
            <InputValidation
              type="number"
              placeHolder="phone"
              ref={(input) => {this.phone = input}}
            />
            <TouchableOpacity style={styles.submit} onPress={this.handleSubmit}>
              <Text>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.signInPressed}>
              <Text>Sign-in</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({

  signUpHeading : {
    textAlign : 'center',
    fontWeight : 'bold',
    fontSize : 20,
    color : '#000000'
  },

  gradient : {
    flex : 1
  },
  submit : {
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'space-around',
    // alignItems : 'center',
    borderWidth : 1,
    borderRadius : 20,
    padding : 10,
    marginTop : 10
  }
})
