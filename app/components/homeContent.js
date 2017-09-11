import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default class HomeContent extends Component {
  render(){
    return(
      <View style={styles.homeContainer}>
        <Text>Welcome to the HomePage</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  homeContainer : {
    backgroundColor : 'white',
    flex : 1
  },

})
