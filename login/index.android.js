import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

// export default class login extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.android.js
//         </Text>
//         <Text style={styles.instructions}>
//           Double tap R on your keyboard to reload,{'\n'}
//           Shake or press menu button for dev menu
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//

import {
  StackNavigator,
} from 'react-navigation';

import SignInScreen from './imports/screens/signIn.js';
import ForgotPassScreen from './imports/screens/forgotPass.js'
//
//
//
// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Welcome',
//   };
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <Button
//         title="Go to Jane's profile"
//         onPress={() =>
//           navigate('Profile', { name: 'Jane' })
//         }
//       />
//     );
//   }
// }
//
// class ProfileScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Hello Mr.',
//   };
//
//   render() {
//     return (
//       <Text>Hello</Text>
//     )
//   }
// }

const login = StackNavigator({
  SignIn: { screen: SignInScreen },
  ForgotPass: { screen: ForgotPassScreen },
});

AppRegistry.registerComponent('login', () => login);
