import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import {
  Button
} from 'native-base'
import {
  StackNavigator
} from 'react-navigation';
import InputField from '../components/input';
import Address from '../utils/address';

export default class ForgotPassScreen extends Component {

  constructor(props){
    super(props);
  }

  genToken = () => {
    console.log('PRESSSSSSSED');
    fetch(`${Address.url}api/recoverPass`,{
      method: 'POST',
      header: {
        Accept: 'application/json'
      },
      body: JSON.stringify({
        email: 'abc@xyz.com'
      })
    })
    .then((response) => {
      Alert.alert('Link for password recovery has been sent to your mail');
    })
    .catch((e) => {
      console.error(e);
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behaviour="padding" style={styles.container}>
        <InputField
          type="email"
          label="Please enter your recovery email"
          float={true}
        />
        <Button style={styles.submit}
          onPress={this.genToken}>
          <Text style={styles.text}>Submit</Text>
        </Button>
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
