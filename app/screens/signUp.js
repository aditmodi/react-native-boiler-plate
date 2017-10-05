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
import { text1, text2 } from '../components/input';
import { passMatch } from '../utils/validations';

export default class SignUpScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    navigate: PropTypes.func,
  }

  static defaultProps = {
    navigation: null,
    navigate: null
  }

  handleSubmit = () => {
    const { navigate } = this.props.navigation;
    let fname = this.fname.state;
    let lname = this.lname.state;
    let email = this.email.state;
    let password = this.password.state;
    let cPassword = this.cPassword.state;
    let phone = this.phone.state;
    let gender = this.gender.state;
    // when entered values are valid
    if (fname.valid === true && lname.valid === true && email.valid === true && phone.valid === true && password.valid === true && cPassword.valid === true && gender.value !== null) {
      // going to route '/users' to add new user
      fetch('http://192.168.1.189:3001/api/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: this.fname.state.value,
          lname: this.lname.state.value,
          email: (this.email.state.value).toLowerCase(),
          password: this.password.state.value,
          cPassword: this.cPassword.state.value,
          phone: this.phone.state.value,
          gender: this.gender.state.value,
        }),
      })
        .then(response => response.json())
        .then((res) => {
          Alert.alert(res.message);
          if (res.message == 'Success!! You may now log in.') {
            navigate('Home');
            // to clear the form after submitting
            this.fname.clear();
            this.lname.clear();
            this.email.clear();
            this.password.clear();
            this.phone.clear();
            this.cPassword.clear();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    // to alert the user
    // Alert.alert('Form submitted');
    } else {
      console.log("fname:", fname.valid);
      console.log("lname:", lname.valid);
      console.log("email:", email.valid);
      console.log("phone:", phone.valid);
      console.log("password:", password.valid);
      console.log("cPassword:", cPassword.valid);
      // when some value is not valid
      if(fname.valid !== true){
        this.fname.setState({
          success: false,
          error: true,
          valid: fname.valid,
          errorVisible: true,
          errorMessage: fname.value.length == 0 ? 'Required field' : 'Invalid',
          value: fname.value,
        })
      }
      if(lname.valid !== true){
        this.lname.setState({
          success: false,
          error: true,
          valid: lname.valid,
          errorVisible: true,
          errorMessage: lname.value.length == 0 ? 'Required field' : 'Invalid',
          value: lname.value,
        })
      }
      if(email.valid !== true){
        this.email.setState({
          success: false,
          error: true,
          valid: email.valid,
          errorVisible: true,
          errorMessage: email.value.length == 0 ? 'Required field' : 'Invalid',
          value: email.value,
        })
      }
      if(password.valid !== true){
        this.password.setState({
          success: false,
          error: true,
          valid: password.valid,
          errorVisible: true,
          errorMessage: password.value.length == 0 ? 'Required field' : 'Passwords do not match',
          value: password.value,
        })
      }
      if(cPassword.valid !== true){
        this.cPassword.setState({
          success: false,
          error: true,
          valid: cPassword.valid,
          errorVisible: true,
          errorMessage: cPassword.value.length == 0 ? 'Required field' : 'Passwords do not match',
          value: cPassword.value,
        })
      }
      if(phone.valid !== true){
        this.phone.setState({
          success: false,
          error: true,
          valid: phone.valid,
          errorVisible: true,
          errorMessage: phone.value.length == 0 ? 'Required field' : 'Passwords do not match',
          value: phone.value,
        })
      }
      if(gender.value === null) {
        Alert.alert("Choose a gender");
      }
      Alert.alert('Please resolve the errors');
    }
  }

  handleBlur = () => {
    const valid = passMatch(text1, text2);
    if (valid == false) {
      this.cPassword.setState({
        success: false,
        error: true,
        valid,
        errorVisible: true,
        errorMessage: text2.length == 0 ? 'Required field' : 'Passwords do not match',
        value: text2,
      });
    } else {
      this.cPassword.setState({
        success: true,
        error: false,
        valid,
        errorVisible: false,
        errorMessage: '',
        value: text2,
      });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
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
        <View style={styles.fake}>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    top: 0,
  },
  fake: {
    height: 40
  }
});
