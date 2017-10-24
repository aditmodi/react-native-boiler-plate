import React, { Component } from 'react';
import {
  Text,
  // View,
  KeyboardAvoidingView,
  // TextInput,
  // TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  Button,
} from 'native-base';
import PropTypes from 'prop-types';
import InputField from '../components/input';
import HeaderComponent from '../components/headerComponent';

export default class reEnterPassScreen extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    navigate: PropTypes.func
  }

  constructor(props) {
    super(props);
    // Defining state
    this.state = {
      valid: false,
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.container} behaviour="padding">
        <HeaderComponent
          leftIcon="arrow-back"
          leftPressed={() => navigate('MidWay')}
          title="Change Password"
        />
        <InputField
          type="password"
          label="Enter your new password"
        />
        <InputField
          type="password"
          label="Re-enter your new password"
        />
        <Button
          style={styles.reset}
          onPress={
            () => {
              // when token is not expired
              if (this.state.valid === true) {
                Alert.alert('Your password has been reset!!');
              } else {
                Alert.alert('Session Expired!!');
              }
            }
          }
        >
          <Text style={styles.text}>Reset</Text>
        </Button>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 350,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  reset: {
    borderWidth: 1,
    backgroundColor: '#00008b',
  },
  text: {
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
    color: '#ffffff',
  },
});
