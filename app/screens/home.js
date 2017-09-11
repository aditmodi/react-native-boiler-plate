import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import Menu from '../components/sideBar';
import SideMenu from 'react-native-side-menu';                  //SideMenu component for react-native
import HomeContent from '../components/homeContent';
import Navbar from '../components/navbar';

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

  handleLogout = () => {
    const { navigate } = this.props.navigation;
    AsyncStorage.removeItem('jwt');
    alert('You have been logged out.');
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
          <Navbar menuPress={this.menuPressed} navIcon='menu'/>
          <HomeContent menuPress={this.menuPressed}/>
        </SideMenu>
    );
  }
}
