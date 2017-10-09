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
import BackgroundImage from './background.js';


export default class SignUpForm extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      // <BackgroundImage>
        <LinearGradient colors={['transparent', 'transparent']} style={styles.gradient}>
        <ScrollView>
          <KeyboardAvoidingView behaviour="padding">
            <InputValidation
              type="text"
              // placeHolder="First Name"
              // ref={(input) => {this.fname = input}}
              ref={this.props.fname}
              label="First name"
            />
            <InputValidation
              type="text"
              // placeHolder="Last Name"
              // ref={(input) => {this.lname = input}}
              ref={this.props.lname}
              label="Last name"
            />
            <InputValidation
              type="email"
              // placeHolder="email"
              // ref={(input) => {this.email = input}}
              ref={this.props.email}
              label="Email"
            />
            <InputValidation
              type="password"
              // placeHolder="Password"
              // ref={(input) => {this.password = input}}
              ref={this.props.password}
              label="Password"
              secure
            />
            <InputValidation
              type="confirmPassword"
              // placeHolder="Confirm Password"
              // ref={(input) => {this.cPassword = input}}
              label="Confirm password"
              ref={this.props.cPassword}
              secure
            />
            <GenderRadio
              // ref={(input) => {this.gender = input}}
              ref={this.props.gender}
            />
            <InputValidation
              type="number"
              // ref={(input) => {this.phone = input}}
              label="Phone no."
              ref={this.props.phone}
            />
            <TouchableOpacity style={styles.button} onPress={this.props.handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.props.signInPressed}>
              <Text style={styles.buttonText}>Sign-in</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>

      </LinearGradient>
    // </BackgroundImage>
    )
  }
}

const styles = StyleSheet.create({

  // signUpHeading : {
  //   textAlign : 'center',
  //   fontWeight : 'bold',
  //   fontSize : 20,
  //   color : '#000000'
  // },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  button : {
    borderWidth : 1,
    // width: 100,
    padding : 10,
    marginTop : 10,
    backgroundColor: '#00008b',
  },
  buttonText: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold'
  }
})
