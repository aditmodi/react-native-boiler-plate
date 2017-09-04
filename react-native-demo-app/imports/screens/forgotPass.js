import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';
import InputValidation from '../components/inputValidation';

export default class ForgotPassScreen extends Component {
  static navigationOptions={
    title: 'Password Reset',
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behaviour="padding" style={styles.container}>
        <InputValidation
          type="email"
          label="Please enter your recovery email"
        />
        <TouchableOpacity style={styles.submit}
          onPress={() => navigate('MidWay')
        }>
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginTop: 40
  },
  submit: {
    borderWidth: 1,
    marginBottom: 300,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#00008b'
  },
  text: {
    padding: 10,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20
  },
})
