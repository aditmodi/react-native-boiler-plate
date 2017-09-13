import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from 'react-native';
import Menu from '../components/sideBar';
import SideMenu from 'react-native-side-menu';                  //SideMenu component for react-native
import HomeContent from '../components/homeContent';
import HeaderComponent from '../components/headerComponent';
import ProtectedView from './ProtectedView';

import { StackNavigator } from 'react-navigation';

export default class HomeScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      menuOpen : false
    }
  }

  static navigationOptions = {
    header : null
  }

  menuPressed = () => {
    this.setState({ menuOpen : true })
  }

  handleLogout = async() => {
    const { navigate } = this.props.navigation;
    let hello = await AsyncStorage.getItem('jwt', (err, token) => {
      console.log("TOKENNNN:::", token);
      fetch('http://192.168.1.189:3001/api/logout',{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          token: `${token}`
        }
      })
      .then((response) => {
        response.json();
        AsyncStorage.removeItem('jwt');
        navigate('SignIn');
      })
      .catch((e) => {
        Alert.alert("There was an error logging out");
      });

    })
    Alert.alert('You have been logged out.');
    navigate('SignIn');
  }

  render(){
    const { navigate } = this.props.navigation;
    const menu = <Menu
      homeButton={() => navigate('Home')}
      profileButton={() => navigate('Profile')}
      logoutButton={this.handleLogout}
    />;
    return(
        <SideMenu isOpen={this.state.menuOpen} menu={menu}>
          <HeaderComponent
            leftIcon='menu'
            leftPressed={this.menuPressed}
            title='Welcome to react native'
          />
          <HomeContent menuPress={this.menuPressed}/>
        </SideMenu>
    );
  }
}
