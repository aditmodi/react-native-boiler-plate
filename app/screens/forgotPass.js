import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Button,
} from 'native-base';
import {
  StackNavigator,
} from 'react-navigation';
import InputField from '../components/input';
import Address from '../utils/address';
import HeaderComponent from '../components/headerComponent';

export default class ForgotPassScreen extends Component {
  constructor(props) {
    super(props);
  }

  genToken = () => {
    const { navigate } = this.props.navigation;
    fetch(`${Address.url}api/recoverPass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Accept: 'application/json',
      },
      body: JSON.stringify({
        email: this.email.state.value,
      }),
    })
      .then(response => response.json())
      .then((res) => {
        console.log(':::::', res);
        if (res.success === true) {
          Alert.alert('Link for password recovery has been sent to your mail');
          navigate('MidWay');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.majCont}>
        <KeyboardAvoidingView behaviour="padding" style={styles.container}>
          <HeaderComponent
            leftIcon="arrow-back"
            leftPressed={() => navigate('Home')}
            title="Enter recovery email"
          />
          <InputField
            type="email"
            label="Please enter your recovery email"
            ref={input => this.email = input}
            float
          />
        </KeyboardAvoidingView>
        <Button
          style={styles.submit}
          onPress={this.genToken}
        >
          <Text style={styles.text}>Submit</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  majCont: {
    flex: 1,
  },
  container: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginTop: 40,
  },
  submit: {
    borderWidth: 1,
    marginBottom: 300,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#00008b',
  },
  text: {
    padding: 10,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
