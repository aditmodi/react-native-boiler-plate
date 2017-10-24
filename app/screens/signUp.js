import React, { Component } from 'react';
import {
  Alert,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import SignUpForm from '../components/signUpForm';
import HeaderComponent from '../components/headerComponent'; // separate component for header bar
// import { passMatch } from '../utils/validations';
import {
  pass,
} from '../components/matchPass';
import Loaders from '../components/loaders';
import Address from '../utils/address';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    top: 0,
  },
  fake: {
    height: 40,
  },
});


export default class SignUpScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    navigate: PropTypes.func,
  }

  static defaultProps = {
    navigation: null,
    navigate: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  handleSubmit = () => {
    const { navigate } = this.props.navigation;
    const fname = this.fname.state;
    const lname = this.lname.state;
    const email = this.email.state;
    const password = pass.text1;
    const cPassword = pass.text2;
    const phone = this.phone.state;
    const gender = this.gender.state;
    // when entered values are valid
    if (fname.valid === true && lname.valid === true) {
      if (email.valid === true && phone.valid === true) {
        if (password === cPassword && gender.value !== null) {
          // going to route '/users' to add new user
          this.setState({
            isLoading: true,
          });
          fetch(`${Address.url}api/register`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fname: this.fname.state.value,
              lname: this.lname.state.value,
              email: (this.email.state.value).toLowerCase(),
              password,
              cPassword,
              phone: this.phone.state.value,
              gender: this.gender.state.value,
            }),
          })
            .then(response => response.json())
            .then((res) => {
              Alert.alert(res.message);
              if (res.message === 'Success!! You may now log in.') {
                navigate('Home');
              }
            })
            .catch((error) => {
              Alert.alert(error);
            });
        }
      }
    } else {
      // when some value is not valid
      if (fname.valid !== true) {
        this.fname.setState({
          success: false,
          error: true,
          valid: fname.valid,
          errorVisible: true,
          errorMessage: fname.value.length === 0 ? 'Required field' : 'Invalid',
          value: fname.value,
        });
      }
      if (lname.valid !== true) {
        this.lname.setState({
          success: false,
          error: true,
          valid: lname.valid,
          errorVisible: true,
          errorMessage: lname.value.length === 0 ? 'Required field' : 'Invalid',
          value: lname.value,
        });
      }
      if (email.valid !== true) {
        this.email.setState({
          success: false,
          error: true,
          valid: email.valid,
          errorVisible: true,
          errorMessage: email.value.length === 0 ? 'Required field' : 'Invalid',
          value: email.value,
        });
      }
      if (phone.valid !== true) {
        this.phone.setState({
          success: false,
          error: true,
          valid: phone.valid,
          errorVisible: true,
          errorMessage: phone.value.length === 0 ? 'Required field' : 'Passwords do not match',
          value: phone.value,
        });
      }
      if (gender.value === null) {
        Alert.alert('Choose a gender');
      }
      Alert.alert('Please resolve the errors');
    }
  }

  renderSignUp = () => {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <HeaderComponent
          leftIcon="arrow-back" // to navigate back
          leftPressed={() => navigate('Home')}
          title="New User"
        />
        <SignUpForm
          fname={(input) => { this.fname = input; }}
          lname={(input) => { this.lname = input; }}
          email={(input) => { this.email = input; }}
          password={(input) => { this.password = input; }}
          cPassword={(input) => { this.cPassword = input; }}
          gender={(input) => { this.gender = input; }}
          phone={(input) => { this.phone = input; }}
          submitPressed={this.handleSubmit}
          handleBlur={this.handleBlur}
        />
        <View style={styles.fake} />
      </ScrollView>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading === true ? <Loaders /> : this.renderSignUp()}
      </View>
    );
  }
}
