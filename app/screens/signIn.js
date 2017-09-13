import React, { Component } from 'react';
import {
  AsyncStorage,
  Alert,
  View,
  StyleSheet
} from 'react-native';
import LoginForm from '../components/loginForm';

export default class SignInScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    
  }

  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <LoginForm
          loginEmail={(input) => {this.loginEmail = input}}
          loginPass={(input) => {this.loginPass = input}}
          loginPressed={
            () => {
              let lengthEmail = this.loginEmail.state.value.length;
              let lengthPass = this.loginPass.state.value.length;
              if (lengthEmail != 0 || lengthPass != 0){
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
                .then((response) => response.json())
                .then(async(res) => {
                  console.log("res:", res);
                  // if (res.status != 200) {
                  //   Alert.alert("Invalid credentials");
                  // } else{
                    console.log("The Response is", res.token);
                    try {
                      await AsyncStorage.setItem('jwt', res.token);
                    }
                    catch (error){
                      console.error(error);
                    }
                    Alert.alert(`Success! You may now access protected content.`);
                    // Redirect to home screen
                    navigate('Home');
                  // }
                })
                .catch((e) => {
                  console.log("dsfdf",e);
                  Alert.alert('There was an error logging in.');
                })
                .done()
              }
              else {
                Alert.alert('Fill the login form');
              }
            }
          }
          signUpPressed={() => navigate('SignUp')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
})
