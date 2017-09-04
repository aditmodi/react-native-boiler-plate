import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,

} from 'react-native';
import { email } from '../validations.js';
import InputValidation from './inputValidation';

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email : '',
      pass : '',
      valid : false,
      message : ''
    }
  }

  handleChange = (text) => {
    console.log("text: ", text);
    let valid;
    valid = email(text);
    this.validate(text, valid);

  }

  validate = (text, valid) =>{
    let msg;
    if ((valid == false) && (text.length != 0)){
      msg = 'Invalid';
    }
    if (text.length == 0){
      msg = 'This field is required';
        }
    if (valid == true){
      msg = '';
    }
    this.state.email = text;
    this.setState({valid : valid, message : msg});
    console.log("email : ", this.state.email);
  }

  assignPass = (text) => {
    this.state.pass = text;
    this.setState({message : ''});
    console.log("password : ", this.state.pass);
  }

  render(){
    return (
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <InputValidation
            type="email"
            label="Enter you email"
          />
          <InputValidation
            type="password"
            label="Enter your password"
          />
        </View>  
        <TouchableOpacity
          onPress={this.props.loginPressed}
          underlayColor='transparent'>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.belowLogin}>
          <Text style={styles.text} onPress={this.props.buttonPressed}>forgot password?</Text>
          <Text style={styles.text} onPress={this.props.signUpPressed}>New user?sign up</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer : {
    flex : 1,
    flexDirection : 'column',
    justifyContent : 'space-between',
    alignItems : 'stretch',
    marginBottom : 150
  },
  button : {
    width : 200,
    marginTop : 50,
    backgroundColor : '#00008b',
    borderWidth : 1,
    marginLeft: 100
  },
  buttonText : {
    color: '#ffffff',
    padding : 10,
    fontSize : 20,
    textAlign : 'center',
    fontWeight: 'bold'
  },
  belowLogin : {
    // flex : 0.5,
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'stretch'
  },
  text : {
    padding : 20,
    color: '#00008b',
  },
  errorMessage : {
    flexDirection : 'row',
    justifyContent : 'flex-end',
    alignItems : 'flex-end',
    color : 'red'
  }
})
