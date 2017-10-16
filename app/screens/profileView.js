import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import {
  Button
} from 'native-base';
import Address from '../utils/address';

export default class ProfileView extends Component {
  constructor(props){
    super(props);
  }

  async componentWillMount(){
    const { navigate } = this.props.navigation;
    const checkToken = await AsyncStorage.getItem('token', (err, token) => {
      console.log('^^^^^^^^');
      const Id = AsyncStorage.getItem('id', (err, id) => {
        console.log('&&&&&&&&&&&&');
        fetch(`${Address.url}api/getUser/${id}`, {
          method: 'GET',
          headers:{
            Accept: 'application/json',
            token: `${token}`
          }
        })
        .then((response) => {
          console.log('******', response.json());
        })
        .catch((e) => {
          console.error(e);
        })
      })
    });
  }

  render() {
    return(
      <View>
        <Text>Hello</Text>
      </View>
    )
  }

}
