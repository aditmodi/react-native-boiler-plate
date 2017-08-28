import React, {Component} from 'react';
import{
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default class Menu extends Component{
  render(){
    return(
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.sideMenuClick} onPress={this.props.homeButton}>
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideMenuClick} onPress={this.props.profileButton}>
          <Text style={styles.menuItem}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideMenuClick} onPress={this.props.logoutButton}>
          <Text style={styles.menuItem}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  menuContainer : {
    flex : 1,
    backgroundColor : '#393c42',
  },
  menuItem : {
    color : '#ffffff',
    fontSize : 20,
    padding : 20,
    borderWidth : 1,

  }
})
