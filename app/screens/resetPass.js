import React, {Component} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';
import InputField from '../components/input';

export default class reEnterPassScreen extends Component {
  constructor(props){
    super(props);
    //Defining state
    this.state = {
      valid : false
    }
  }

  static navigationOptions = {
    header: null
  }

  render(){
    return(
      <KeyboardAvoidingView style={styles.container} behaviour="padding">
        <InputField
          type="password"
          label="Enter your new password"
        />
        <InputField
          type="password"
          label="Re-enter your new password"
        />
        <TouchableOpacity
          style={styles.reset}
          onPress={
            () => {
              //when token is not expired
              if (this.state.valid == true){
                Alert.alert('Your password has been reset!!')
              }
              //when token gets expired
              else {
                Alert.alert('Session Expired!!')
              }
            }
          }
          >
          <Text style={styles.text}>Reset</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 350,
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  reset: {
    borderWidth: 1,
    backgroundColor: '#00008b'
  },
  text: {
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
    color: '#ffffff'
  }
})
