import React, { Component } from 'react';
import {
  AsyncStorage,
  Alert
} from 'react-native';
import LoginForm from '../components/loginForm';

export default class SignInScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  }

  render(){
    const { navigate } = this.props.navigation;
    return(
      <LoginForm
        loginEmail={(input) => {this.loginEmail = input}}
        loginPass={(input) => {this.loginPass = input}}
        loginPressed={
          () => {
            fetch('http://192.168.1.189:3001/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify({
                username: this.loginEmail.state.value,
                password: this.loginPass.state.value
              })
            })
            // .then((response) => {console.log("response",response);response.json()})
            .then((res) => {
              console.log("res:", res);
              if (res.error) {
                Alert.alert(res.error);
              } else {
                AsyncStorage.setItem('jwt', res.token)
                Alert.alert(`Success! You may now access protected content.`)
                // Redirect to home screen
                navigate('Home')
              }
            })
            .catch((e) => {
              console.log("dsfdf",e);
              Alert.alert('There was an error logging in.');
            })
            .done()
          }
        }
        signUpPressed={() => navigate('SignUp')}
      />
    )
  }
}
