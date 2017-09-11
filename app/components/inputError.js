import React, { Component } from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';

export default class InputError extends Component {
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.errorVisible == true){
      return <Text style={styles.error}>{this.props.errorMessage}</Text>
    }
    else {
      return false;
    }
  }
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    alignSelf: 'flex-end',
    marginRight: 10
  }
})
