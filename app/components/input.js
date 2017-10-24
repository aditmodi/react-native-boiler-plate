import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Item,
  Input,
  Label,
} from 'native-base';
import {
  View,
} from 'react-native';
import {
  email,
  alphaNumeric,
  onlyNumber,
  // passMatch,
} from '../utils/validations';
import InputError from './inputError';

export const text1 = '';
export const text2 = '';

export default class InputField extends Component {
  static propTypes = {
    label: PropTypes.string,
    secure: PropTypes.bool,
    keyboard: PropTypes.string,
    type: PropTypes.string,
    blur: PropTypes.func,
    value: PropTypes.string,
    float: PropTypes.bool,
    stacked: PropTypes.bool,
  }

  static defaultProps = {
    label: null,
    secure: null,
    keyboard: null,
    type: null,
    blur: null,
    value: null,
    float: null,
    stacked: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: false,
      valid: false,
      errorVisible: false,
      errorMessage: '',
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  clear = () => {
    this.setState({
      success: false,
      error: false,
      valid: false,
      errorVisible: false,
      errorMessage: '',
      value: '',
    });
  }

  handleChange = (text) => {
    const { type } = this.props;
    let valid;
    if (type === 'email') {
      valid = email(text);
    } else if (type === 'text') {
      valid = alphaNumeric(text);
    } else if (type === 'number') {
      valid = onlyNumber(text);
    } else {
      valid = true;
    }
    this.validate(text, valid, type);
  }

  validate = (text, valid, type) => {
    let msg;
    let visible;
    let success;
    let error;
    if (valid === false && type !== 'password' && type !== 'cPassword') {
      if (text.length === 0) {
        msg = 'Required field';
      } else {
        msg = 'Invalid';
      }
      visible = true;
      error = true;
      success = false;
    } else if (valid === true && type === 'number' && text.length > 10) {
      msg = 'Limit is only upto 10 digits';
      visible = true;
      error = true;
      // icon = 'close-circle';
      success = false;
    } else {
      success = true;
      // icon = 'checkmark-circle';
      visible = false;
      msg = '';
      error = false;
    }
    this.setState({
      success,
      error,
      valid,
      errorVisible: visible,
      errorMessage: msg,
      value: text,
    });
  }


  render() {
    return (
      <View>
        <Item
          floatingLabel={this.props.float}
          stackedLabel={this.props.stacked}
          success={this.state.success}
          error={this.state.error}
        >
          <Label>{this.props.label}</Label>
          <Input
            secureTextEntry={this.props.secure}
            onChangeText={text => this.handleChange(text)}
            onBlur={this.props.blur}
            value={this.state.value}
            keyboardType={this.props.keyboard}
          />
        </Item>
        <InputError
          errorVisible={this.state.errorVisible}
          errorMessage={this.state.errorMessage}
        />
      </View>
    );
  }
}
