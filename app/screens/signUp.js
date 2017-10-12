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
import { passMatch } from '../utils/validations';
import {
  text1,
  text2
} from '../components/matchPass';
import Loaders from '../components/loaders';
import Address from '../utils/address';

export default class SignUpScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    navigate: PropTypes.func,
  }

  static defaultProps = {
    navigation: null,
    navigate: null
  }

  constructor(props){
    super(props);
    this.state = {
      isLoading: false
    }
  }

  handleSubmit = () => {
    const { navigate } = this.props.navigation;
    console.log("SDFDSSD:", text1);
    let fname = this.fname.state;
    let lname = this.lname.state;
    let email = this.email.state;
    let password = text1;
    let cPassword = text2;
    let phone = this.phone.state;
    let gender = this.gender.state;
    // when entered values are valid
    if (fname.valid === true && lname.valid === true && email.valid === true && phone.valid === true && password === cPassword && gender.value !== null) {
      // going to route '/users' to add new user
      this.setState({
        isLoading: true
      })
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
          password: password,
          cPassword: cPassword,
          phone: this.phone.state.value,
          gender: this.gender.state.value,
        }),
      })
        .then(response => response.json())
        .then((res) => {
          Alert.alert(res.message);
          if (res.message == 'Success!! You may now log in.') {
            navigate('Home');
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

  renderSignUp = () => {
    const { navigate } = this.props.navigation;
    return(
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
        <View style={styles.fake}>

        </View>
      </ScrollView>
    )
  }


  render() {

    return (
      <View style={styles.container}>
        {this.state.isLoading === true ? <Loaders/> : this.renderSignUp()}
      </View>
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
