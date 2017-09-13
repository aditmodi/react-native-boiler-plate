import React, { Component } from 'react';
import HeaderComponent from '../components/headerComponent';

export default class ProfileScreen extends Component {

  static navigationOptions = {
    header: null
  }

  render(){
    return(
      <HeaderComponent
        leftIcon='arrow-back'
        title='Profile'
      />
    )
  }
}
