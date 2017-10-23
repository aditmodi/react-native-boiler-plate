import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: '#34495e',
  },
  menuItem: {
    color: '#ffffff',
    fontSize: 20,
    padding: 20,
    borderWidth: 1,

  },
});

export default class Menu extends Component {
  static propTypes = {
    homeButton: PropTypes.func,
    profileButton: PropTypes.func,
    logoutButton: PropTypes.func,
  }

  static defaultProps = {
    homeButton: null,
    profileButton: null,
    logoutButton: null,
  }

  render() {
    return (
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.sideMenuClick} onPress={this.props.homeButton}>
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideMenuClick} onPress={this.props.profileViewButton}>
          <Text style={styles.menuItem}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideMenuClick} onPress={this.props.logoutButton}>
          <Text style={styles.menuItem}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
