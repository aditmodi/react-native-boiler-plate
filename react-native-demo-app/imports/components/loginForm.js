import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import { email } from '../validations.js';

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
        <Text style={styles.errorMessage}>{this.state.message}</Text>
        <TextInput
          placeholder = 'email'
          style={styles.input}
          onChangeText={(text) => this.handleChange(text)}
          // ref={this.props.email}
        />
        <TextInput
          placeholder = 'password'
          secureTextEntry
          style={styles.input}
          onChangeText={(text) => this.assignPass(text)}
          // ref={this.props.password}
          secureTextEntry
        />
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
    alignItems : 'center',
    marginBottom : 150
  },
  input : {
    padding : 15,
    width : 300,
    fontSize : 15,
    fontWeight : '300'
  },
  button : {
    width : 200,
    marginTop : 50,
    backgroundColor : 'transparent',
    borderWidth : 1,
    borderRadius : 20
  },
  buttonText : {
    padding : 10,
    fontSize : 15,
    textAlign : 'center'
  },
  belowLogin : {
    // flex : 0.5,
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'stretch'
  },
  text : {
    padding : 20
  },
  errorMessage : {
    flexDirection : 'row',
    justifyContent : 'flex-end',
    alignItems : 'flex-end',
    color : 'red'
  }
})
