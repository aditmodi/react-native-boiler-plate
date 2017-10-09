// import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SignInScreen from './imports/screens/signIn';
import ForgotPassScreen from './imports/screens/forgotPass';
import SignUpScreen from './imports/screens/signUp';
import reEnterPassScreen from './imports/screens/reEnterPass';
import HomeScreen from './imports/screens/home';
import MidWayScreen from './imports/screens/midWay';
import ProfileScreen from './imports/screens/profile';
import './ReactotronConfig';

const login = StackNavigator({
  SignIn: { screen: SignInScreen },
  ForgotPass: { screen: ForgotPassScreen },
  SignUp: { screen: SignUpScreen },
  ResetPass: { screen: reEnterPassScreen },
  Home: { screen: HomeScreen },
  MidWay: { screen: MidWayScreen },
  Profile: { screen: ProfileScreen }
},{headerMode: 'screen' });

AppRegistry.registerComponent('login', () => login);
