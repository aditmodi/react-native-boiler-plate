import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';

export default class LoginForm extends Component {
  render(){
    return (
      <View style={styles.inputContainer}>
        <TextInput
          placeholder = 'username'
          style={styles.input}
        />
        <TextInput
          placeholder = 'password'
          style={styles.input}
        />
        <TouchableHighlight
          onPress={this.props.buttonPressed}
          underlayColor='transparent'>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.belowLogin}>
          <Text style={styles.text} onPress={this.props.buttonPressed}>forgot password?</Text>
          <Text style={styles.text} onPress={this.props.buttonPressed}>New user?sign up</Text>
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
    fontSize : 15
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
  }
})
