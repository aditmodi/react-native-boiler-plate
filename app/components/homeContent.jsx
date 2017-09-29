import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: 'white',
    flex: 1,
  },

});

export default class HomeContent extends Component {
  render() {
    return (
      <View style={styles.homeContainer}>
        <Text>Welcome to the HomePage</Text>
      </View>
    );
  }
}
