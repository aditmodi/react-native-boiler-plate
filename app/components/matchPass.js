import React, { Component } from 'react';
import {
  Item,
  Input,
  Label,
} from 'native-base';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import InputError from './inputError';

// export let text1 = '';
// export let text2 = '';
export const pass = {
  text1: '',
  text2: '',
};

export default class MatchPass extends Component {
  static propTypes = {
    pass: PropTypes.func,
    cPass: PropTypes.func,
  }

  static defaultProps = {
    pass: null,
    cPass: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: false,
      valid: false,
      errorVisible: false,
      errorMessage: '',
      value1: '',
      value2: '',
    };
  }

  handlePass = (text) => {
    pass.text1 = text;
    if (pass.text1 !== pass.text2) {
      this.setState({
        success: false,
        error: true,
        valid: false,
        errorVisible: true,
        errorMessage: (pass.text1.length === 0 && pass.text2.length === 0) ? 'Required fields' : 'Passwords do not match',
        value1: text,
      });
    }
    if (pass.text1 === pass.text2) {
      this.setState({
        success: true,
        error: false,
        valid: true,
        errorVisible: false,
        errorMessage: '',
        value1: text,
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
      value1: '',
      value2: '',
    });
  }

  handleCPass = (text) => {
    pass.text2 = text;
    if (pass.text1 !== pass.text2) {
      this.setState({
        success: false,
        error: true,
        valid: false,
        errorVisible: true,
        errorMessage: (pass.text1.length === 0 && pass.text2.length === 0) ? 'Required fields' : 'Passwords do not match',
        value2: text,
      });
    }
    if (pass.text1 === pass.text2) {
      this.setState({
        success: true,
        error: false,
        valid: true,
        errorVisible: false,
        errorMessage: '',
        value2: text,
      });
    }
  }

  handleBlur = () => {
    if (pass.text1 !== pass.text2) {
      this.setState({
        success: false,
        error: true,
        valid: false,
        errorVisible: true,
        errorMessage: (pass.text1.length === 0 && pass.text2.length === 0) ? 'Required fields' : 'Passwords do not match',
        // value: (type=='password') ? text1 : text2
      });
    }
    if (pass.text1 === pass.text2) {
      this.setState({
        success: true,
        error: false,
        valid: true,
        errorVisible: false,
        errorMessage: '',
        // value: (type=='password') ? text1 : text2
      });
    }
  }

  render() {
    return (
      <View>
        <Item
          floatingLabel
          success={this.state.success}
          error={this.state.error}
        >
          <Label>Password</Label>
          <Input
            secureTextEntry
            onChangeText={text => this.handlePass(text)}
            onBlur={this.handleBlur}
            ref={this.props.pass}
            value={this.state.value1}
          />
        </Item>
        <InputError
          errorVisible={this.state.errorVisible}
          errorMessage={this.state.errorMessage}
        />
        <Item
          floatingLabel
          success={this.state.success}
          error={this.state.error}
        >
          <Label>Confirm Password</Label>
          <Input
            secureTextEntry
            onChangeText={text => this.handleCPass(text)}
            onBlur={this.handleBlur}
            ref={this.props.cPass}
            value={this.state.value2}
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
