//Creating a component for input fields validation and also to define
//type of the input fields

import React, {Component} from 'react';
import {
  TextInput,
  View,
  StyleSheet
} from 'react-native';
import InputError from './inputError.js';
import {
  alphaNumeric,
  onlyNumber,
  email,
  passMatch
} from '../validations.js';

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

  handleChange = (text) => {
    console.log("text : ", text);
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
    this.validate(text, valid);
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
    this.setState({valid : valid, errorMessage : msg, errorVisible : visible});
  }

  render(){
    const { name } = this.props;
    return(
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={this.props.PLACEHOLDER}
          onChangeText={(text) => this.handleChange(text)}
          ref = {(i) =>{this[this.props.name] = i}}
          // underlineColorAndroid='rgba(0,0,0,0)'
        />
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
    // borderWidth : 1,
    margin : 5
  }
})
