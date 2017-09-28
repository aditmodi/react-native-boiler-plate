import React, { Component } from 'react';
import InputField from './input';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Text,
  Item,
  Input,
  Icon,
  Label
} from 'native-base';
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import GenderRadio from './genderRadio';

export default class SignUpForm extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    fname: PropTypes.func,
    lname: PropTypes.func,
    email: PropTypes.func,
    password: PropTypes.func,
    cPassword: PropTypes.func,
    gender: PropTypes.func,
    phone: PropTypes.func
  }

  render(){
    return(
      <ScrollView>
        <Form>
          <KeyboardAvoidingView behaviour="padding"  style={styles.Container}>
            <InputField
              type='text'
              label='First Name'
              ref={this.props.fname}
            />
            <InputField
              type='text'
              label='Last Name'
              ref={this.props.lname}
            />
            <InputField
              type='email'
              label='Email'
              ref={this.props.email}
            />
            <InputField
              type='password'
              label='Password'
              ref={this.props.password}
              secure
            />
            <InputField
              type='cPassword'
              label='Confirm Password'
              ref={this.props.cPassword}
              secure
            />
            <GenderRadio
              ref={this.props.gender}
            />
            <InputField
              type='number'
              label='Phone No.'
              ref={this.props.phone}
              // keyboard={'numeric'}
            />
            <Button style={styles.submitButton} onPress={this.props.submitPressed}>
              <Text style={styles.submitText}>Submit</Text>
            </Button>
          </KeyboardAvoidingView>
        </Form>
      </ScrollView>




    )
  }
}

const styles = StyleSheet.create({
  Container: {
    // flex: 1,
    // backgroundColor: '#ffffff',
  },
  submitButton: {
    flexDirection:'row',
    alignSelf: 'center',
    marginTop: 30
  }
})
