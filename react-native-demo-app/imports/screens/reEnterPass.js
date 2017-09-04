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
import InputValidation from '../components/inputValidation';

export default class reEnterPassScreen extends Component {
  constructor(props){
    super(props);
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
        <InputValidation
          type="password"
          label="Enter your new password"
        />
        <InputValidation
          type="password"
          label="Re-enter your new password"
        />
        <TouchableOpacity
          style={styles.reset}
          onPress={
            () => {
              if (this.state.valid == true){
                Alert.alert('Your password has been reset!!')
              }
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
