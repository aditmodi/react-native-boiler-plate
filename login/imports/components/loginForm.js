import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import { email } from '../validations.js';

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      valid : false,
      message : ''
    }
  }

  handleChange = (event) => {
    this.setState({valid : email(event.nativeEvent.text)});
    this.setState({message : ((this.state.valid == false) && (event.nativeEvent.text.length != 0)) ? 'Invalid email' : (event.nativeEvent.text.length == 0) ? 'required' : ''})
  }

  render(){
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.errorMessage}>{this.state.message}</Text>
        <TextInput
          placeholder = 'email'
          style={styles.input}
          onChange={this.handleChange}
        />
        <TextInput
          placeholder = 'password'
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity
          onPress={this.props.loginPressed}
          underlayColor='transparent'>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.belowLogin}>
          <Text style={styles.text} onPress={this.props.buttonPressed}>forgot password?</Text>
          <Text style={styles.text} onPress={this.props.signUpPressed}>New user?sign up</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer : {
    flex : 1,
    flexDirection : 'column',
    justifyContent : 'space-between',
    alignItems : 'center',
    marginBottom : 150
  },
  input : {
    padding : 15,
    width : 300,
    fontSize : 15,
    fontWeight : '300'
  },
  button : {
    width : 200,
    marginTop : 50,
    backgroundColor : 'transparent',
    borderWidth : 1,
    borderRadius : 20
  },
  buttonText : {
    padding : 10,
    fontSize : 15,
    textAlign : 'center'
  },
  belowLogin : {
    // flex : 0.5,
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'stretch'
  },
  text : {
    padding : 20
  },
  errorMessage : {
    flexDirection : 'row',
    justifyContent : 'flex-end',
    alignItems : 'flex-end',
    color : 'red'
  }
})
