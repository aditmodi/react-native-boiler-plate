import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {
  Button,
} from 'native-base';
import HeaderComponent from '../components/headerComponent';

export default class MidWayScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <HeaderComponent
          leftIcon="arrow-back"
          leftPressed={() => navigate('ForgotPass')}
          title="Midway"
        />
        <Button
          onPress={
            () => {
              navigate('ResetPass');
            }
          }
        >
          <Text>Click here to reset your password</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
