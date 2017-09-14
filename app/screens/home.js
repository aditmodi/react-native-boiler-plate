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
import HomeContent from '../components/homeContent';            //Content of home page
import HeaderComponent from '../components/headerComponent';
import ProtectedView from './ProtectedView';                    //to access the protected content

export default class HomeScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      menuOpen : false
    }
  }

  menuPressed = () => {
    this.setState({ menuOpen : true })
  }

  //componentWillMount is here to check if the token of the user still exists or not
  //if it exists, it navigates directly to the home page of that user
  async componentWillMount() {
    const { navigate } = this.props.navigation;
      let checkToken = await AsyncStorage.getItem('jwt');
      console.log("CheckToken:", checkToken);
      if (checkToken == null){
        navigate('SignIn');
      }
  }

  handleLogout = async() => {
    const { navigate } = this.props.navigation;
    let hello = await AsyncStorage.getItem('jwt', (err, token) => {       //retrieve the token
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
        AsyncStorage.removeItem('jwt');                                 //remove the token from the local storage
        navigate('SignIn');                                             //and then navigate to sign in page
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
          {/* isOpen = true or false */}
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
