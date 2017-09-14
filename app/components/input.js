import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Item,
  Input,
  Icon,
  Label,
} from 'native-base';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  email,
  alphaNumeric,
  onlyNumber,
  passMatch
} from '../utils/validations';
import InputError from './inputError';

var text1='';
var text2='';

export default class InputField extends Component {
  constructor(props){
    super(props);
    this.state = {
      success: false,
      error: false,
      icon: 'checkmark-circle',
      valid: false,
      errorVisible: false,
      errorMessage: '',
      value: ''
    }
  }

  static propTypes = {
    label : PropTypes.string,
    secure : PropTypes.bool,
    keyboard : PropTypes.string
  }

  clear = () => {
    this.setState({
      success: false,
      error: false,
      icon: 'checkmark-circle',
      valid: false,
      errorVisible: false,
      errorMessage: '',
      value: ''
    })
  }

  handleChange = (text) => {
    const { type } = this.props;
    let valid;
    if (type == 'email' ) {
      valid = email(text);
    }
    else if (type == 'text') {
      valid = alphaNumeric(text);
    }
    else if (type == 'number') {
      valid = onlyNumber(text);
    }
    else if (type == 'password' || type== 'cPassword'){
      if (type == 'password'){
        text1 = text;
        valid = true;
      }
      else {
        text2 = text;
        valid = passMatch(text1, text2);
      }
      console.log("valid:",valid);
      console.log("text1:",text1);
      console.log("text2:",text2);
    }
    else {
      valid = true;
    }
    this.validate(text, valid, type);
  }

  validate = (text, valid, type) => {
    let msg, visible, success, error, icon;
    if (valid == false) {
      if (text.length == 0) {
        msg = 'Required field';
      }
      else if (type == 'cPassword'){
        msg = 'Passwords do not match'
      }
      else if (type== 'password'){
        msg = 'Passwords do not match'
      }
      else {
        msg = 'Invalid';
      }
      visible = true;
      error = true;
      icon = 'close-circle';
      success = false;
    }
    else if (valid == true && type == 'number' && text.length > 10) {
      msg = 'Limit is only upto 10 digits';
      visible = true;
      error = true;
      // icon = 'close-circle';
      success = false;
    }
    else {
      success = true;
      // icon = 'checkmark-circle';
      visible = false;
      msg = '';
      error = false;
    }
    this.setState({
      success: success,
      error: error,
      icon: icon,
      valid: valid,
      errorVisible: visible,
      errorMessage: msg,
      value: text
    });
  }

  render(){
    return(
      <View>
        <InputError
          errorVisible={this.state.errorVisible}
          errorMessage={this.state.errorMessage}
        />
        <Item
          floatingLabel
          success={this.state.success}
          error={this.state.error}>
          <Label>{this.props.label}</Label>
          <Input
            secureTextEntry={this.props.secure}
            onChangeText={(text) => this.handleChange(text)}
            onBlur={this.handleBlur}
            value={this.state.value}
            keyboardType={this.props.keyboard}
          />
        </Item>

      </View>
    )
  }
}
