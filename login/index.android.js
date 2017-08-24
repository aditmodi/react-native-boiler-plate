import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import SignInScreen from './imports/screens/signIn.js';
import ForgotPassScreen from './imports/screens/forgotPass.js';
import SignUpScreen from './imports/screens/signUp.js';
import reEnterPassScreen from './imports/screens/reEnterPass.js';


const login = StackNavigator({
  SignIn: { screen: SignInScreen },
  ForgotPass: { screen: ForgotPassScreen },
  SignUp : { screen: SignUpScreen },
  ResetPass : { screen: reEnterPassScreen }
});

AppRegistry.registerComponent('login', () => login);
