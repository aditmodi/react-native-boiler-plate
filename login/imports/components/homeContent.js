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
        <TouchableOpacity onPress={this.props.menuPress}>
          <Text style={styles.menuButton}>Menu</Text>
        </TouchableOpacity>
        <Text>Welcome to the HomePage</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  homeContainer : {
    backgroundColor : 'orange',
    flex : 1
  },
  menuButton : {
    borderWidth : 1,
    padding : 10,
    width : 60
  }
})
