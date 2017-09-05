//Creating a component to show error messages

import React, {Component} from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';

export default class InputError extends Component {
  render(){
    if (this.props.errorVisible == true){
      return <Text style={styles.error}>{this.props.errorMessage}</Text>
    }
    else {
      return false
    }
  }
}

const styles = StyleSheet.create({
  error : {
    color : 'red',
    textAlign : 'right',
    right: 20,
    bottom : 35,
  }
})
