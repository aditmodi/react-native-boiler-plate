import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Menu from '../components/sideBar';
import SideMenu from 'react-native-side-menu'; // SideMenu component for react-native
import HomeContent from '../components/homeContent'; // Content of home page
import HeaderComponent from '../components/headerComponent';
import LoginForm from '../components/loginForm'; // Form with email and password
// import SplashScreen from 'react-native-splash-screen';
let name;
// import { name } from './signIn';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      token: null,

    };
  }

  menuPressed = () => {
    this.setState({ menuOpen: true });
  }

  // componentWillMount is here to check if the token of the user still exists or not
  // if it exists, it navigates directly to the home page of that user
  async componentWillMount() {
    const { navigate } = this.props.navigation;
    const checkToken = await AsyncStorage.getItem('jwt');
    name = await AsyncStorage.getItem('name');
    console.log('CheckToken:', checkToken);
    if (checkToken != null) {
      this.setState({
        token: checkToken,
      });
    }
    // SplashScreen.hide();
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  handleLogout = async () => {
    const { navigate } = this.props.navigation;
    const hello = await AsyncStorage.getItem('jwt', (err, token) => { // retrieve the token
      console.log('TOKENNNN:::', token);
      fetch('http://192.168.1.189:3001/api/logout', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          token: `${token}`,
        },
      })
        .then((response) => {
          response.json();
          AsyncStorage.removeItem('jwt'); // remove the token from the local storage
          AsyncStorage.removeItem('email');
          AsyncStorage.removeItem('name');
          this.setState({
            token: null,
          }); // and then navigate to sign in page
        })
        .catch((e) => {
          Alert.alert('There was an error logging out');
        });
    });
    Alert.alert('You have been logged out.');
    navigate('SignIn');
  }

  renderHome = () => {
    const { navigate } = this.props.navigation;
    const menu = (<Menu
      homeButton={() => navigate('Home')}
      profileButton={() => navigate('Profile')}
      logoutButton={this.handleLogout}
    />);
    return (
      <SideMenu isOpen={this.state.menuOpen} menu={menu}>
        {/* isOpen = true or false */}
        <HeaderComponent
          leftIcon="menu"
          leftPressed={this.menuPressed}
          title={name?`Welcome ${name}`:`Welcome`}
        />
        <HomeContent menuPress={this.menuPressed} />
      </SideMenu>
    );
  }

  renderSignIn = () => {
    const { navigate } = this.props.navigation; // to navigate to other pages
    return (
      <LoginForm
        loginEmail={(input) => { this.loginEmail = input; }} // for the whole reference of email field
        loginPass={(input) => { this.loginPass = input; }} // for the whole reference of password field
        loginPressed={// triggers when login button is pressed
          () => {
            const lengthEmail = this.loginEmail.state.value.length; // calculating length as to see if the fields arent empty
            const lengthPass = this.loginPass.state.value.length;
            if (lengthEmail != 0 || lengthPass != 0) { // when fields are filled
              fetch('http://192.168.1.189:3001/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
                body: JSON.stringify({
                  username: (this.loginEmail.state.value).toLowerCase(), // passing email and password to the body of the route
                  password: this.loginPass.state.value,
                }),
              })
                .then(response => response.json())
                .then(async (res) => {
                  console.log('The Response is', res); // token is created
                  if (res.token) {
                    try {
                      await AsyncStorage.setItem('jwt', res.token); // token is stored
                      await AsyncStorage.setItem('email', this.loginEmail.state.value); // email is stored
                      await AsyncStorage.setItem('name', res.name); // name is stored
                      Alert.alert(`Welcome ${res.name}`);
                      // Redirect to home screen
                      this.setState({
                        token: res.token,
                      });
                    } catch (error) {
                      Alert.alert('got this error');
                      console.error(error);
                    }
                  } else {
                    Alert.alert(res.message);
                  }
                })
                .catch((e) => {
                  console.log('DASDASDSA', e);
                  Alert.alert('Check your internet connection'); // triggers when there is server issue
                })
                .done();
            } else {
              Alert.alert('Fill the login form'); // when there is error in the fields from the client side
            }
          }
        }
        signUpPressed={() => navigate('SignUp')} // when signUp is pressed
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.token ? this.renderHome() : this.renderSignIn()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // adjusts according to the screen
    backgroundColor: '#ffffff',
  },
});
