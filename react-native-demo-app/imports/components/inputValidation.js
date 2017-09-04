//Creating a component for input fields validation and also to define
//type of the input fields

import React, {Component} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import InputError from './inputError.js';
import {
  alphaNumeric,
  onlyNumber,
  email,
  passMatch
} from '../validations.js';
import FloatingLabel from 'react-native-floating-labels';

var pass1 = '';
var pass2 = '';

export default class InputValidation extends Component{
  constructor(props){
    super(props);
    this.state = {
      value : '',
      valid : false,
      errorMessage : '',
      errorVisible : false
    }
  }

  clear = () => {
    this.setState({
      value : '',
      valid : false,
      errorMessage : '',
      errorVisible : false
    });
  }

  handleChange = (text) => {

    const { type } = this.props;
    let valid;
    if (type == 'email'){
      valid = email(text);
    }
    if (type == 'number'){
      valid = onlyNumber(text);
    }
    if (type == 'text'){
      valid = alphaNumeric(text);
    }
    if (type == 'password'){
      pass1 = text;
    }
    if (type == 'confirmPassword'){
      this.match(pass1, pass2);
    }
    this.validate(text, valid);
  }

  match = (pass1, pass2) => {
    let valid;
    let msg;
    let visible;
    if (pass1.length != 0 && pass2.length != 0) {
      valid = passMatch(pass1, pass2);
    }
    if (valid == false) {
      msg = 'passwords do not match';
      visible = true;
    }
    this.setState({value : pass2, valid : valid, errorMessage : msg, errorVisible : visible});
  }

  validate = (text, valid) => {
    let msg;
    let visible;
    if ((valid == false) && (text.length != 0)){
      msg = 'Invalid';
      visible = true;
    }
    if (text.length == 0){
      msg = 'This field is required';
      visible = true;
    }
    if (valid == true){
      msg = '';
      visible = false;
    }
    this.setState({value : text, valid : valid, errorMessage : msg, errorVisible : visible});
  }

  render(){
    const { name } = this.props;
    return(
      <View style={styles.inputContainer}>
        <FloatingLabel
          inputStyle={styles.input}
          labelStyle={styles.label}
          onChangeText={(text) => this.handleChange(text)}
          onChange={this.props.Change}
          onBlur={this.props.Blur}
          value={this.state.value}
          secureTextEntry={this.props.secure}
          >{this.props.label}</FloatingLabel>
        <InputError
          errorVisible={this.state.errorVisible}
          errorMessage={this.state.errorMessage}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer : {
    flex : 1,
    justifyContent : 'flex-start',
    alignItems : 'stretch'
  },
  input : {
    borderWidth : 0,
    margin : 5
  },
  label : {
    color : '#00008b',
    fontSize : 15
  }
})
