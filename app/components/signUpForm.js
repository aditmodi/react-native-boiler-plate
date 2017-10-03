import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Text,
} from 'native-base';
import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import InputField from './input';
import GenderRadio from './genderRadio';

const styles = StyleSheet.create({
  submitButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default class SignUpForm extends Component {
  static propTypes = {
    fname: PropTypes.func,
    lname: PropTypes.func,
    email: PropTypes.func,
    password: PropTypes.func,
    cPassword: PropTypes.func,
    gender: PropTypes.func,
    phone: PropTypes.func,
    handleBlur: PropTypes.func,
    submitPressed: PropTypes.func,
  }

  static defaultProps = {
    fname: null,
    lname: null,
    email: null,
    password: null,
    cPassword: null,
    gender: null,
    phone: null,
    handleBlur: null,
    submitPressed: null,
  }

  render() {
    return (
      <ScrollView>
        <Form>
          <KeyboardAvoidingView behaviour="padding">
            <InputField
              type="text"
              label="First Name"
              ref={this.props.fname}
            />
            <InputField
              type="text"
              label="Last Name"
              ref={this.props.lname}
            />
            <InputField
              type="email"
              label="Email"
              ref={this.props.email}
            />
            <InputField
              type="password"
              label="Password"
              blur={this.props.handleBlur}
              ref={this.props.password}
              secure
            />
            <InputField
              type="cPassword"
              label="Confirm Password"
              blur={this.props.handleBlur}
              ref={this.props.cPassword}
              secure
            />
            <GenderRadio
              ref={this.props.gender}
            />
            <InputField
              type="number"
              label="Phone No."
              ref={this.props.phone}
              // keyboard={'numeric'}
            />
            <Button style={styles.submitButton} onPress={this.props.submitPressed}>
              <Text>Submit</Text>
            </Button>
          </KeyboardAvoidingView>
        </Form>
      </ScrollView>


    );
  }
}
