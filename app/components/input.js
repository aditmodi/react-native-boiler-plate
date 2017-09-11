import React, { Component } from 'react';
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
  onlyNumber
} from '../utils/validations';
// import getTheme from '../../native-base-theme/components';
// import material from '../../native-base-theme/variables/material';
import InputError from './inputError';

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
      icon = 'close-circle';
      success = false;
    }
    else {
      success = true;
      icon = 'checkmark-circle';
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
        <Item
          floatingLabel
          success={this.state.success}
          error={this.state.error}>
          <Label>{this.props.label}</Label>
          <Input
            secureTextEntry={this.props.secure}
            onChangeText={(text) => this.handleChange(text)}
            value={this.state.value}
          />
        </Item>
        <InputError
          errorVisible={this.state.errorVisible}
          errorMessage={this.state.errorMessage}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    // marginLeft: 50,
  }
})
