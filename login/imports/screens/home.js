import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Menu from '../components/sidebarMenu.js';
// const SideMenu = require('react-native-side-menu');
import SideMenu from 'react-native-side-menu';
import HomeContent from '../components/homeContent.js';
import { StackNavigator } from 'react-navigation';

export default class HomeScreen extends Component{

  constructor(props){
    super(props);
    this.state = {
      menuOpen : false
    }
  }

  static navigationOptions = {
    title : 'Welcome',
    header : null
  };

  menuPressed = () => {
    this.setState({ menuOpen : true })
  }

  render(){
    const { navigate } = this.props.navigation;
    const menu = <Menu
      homeButton={() => navigate('Home')}
      profileButton={() => navigate('Profile')}
      logoutButton={() => navigate('SignIn')}
    />;
    return(
        <SideMenu isOpen={this.state.menuOpen} menu={menu}>
          <HomeContent menuPress={this.menuPressed}/>
        </SideMenu>
    );
  }
}
