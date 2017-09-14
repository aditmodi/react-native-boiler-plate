import React, { Component } from 'react';
import InputField from './input';
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

  render(){
    return(
      <ScrollView >
        <KeyboardAvoidingView behaviour="padding" style={styles.Container}>    
          <Form>
            <View>
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
                keyboard={'numeric'}
              />
              <Button style={styles.submitButton} onPress={this.props.submitPressed}>
                <Text style={styles.submitText}>Submit</Text>
              </Button>
            </View>
          </Form>
        </KeyboardAvoidingView>
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
