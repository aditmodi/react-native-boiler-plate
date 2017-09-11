import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet
} from 'react-native';
import {
  Icon
} from 'native-base';

export default class Navbar extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.navbar}>
        <TouchableOpacity onPress={this.props.menuPress} style={styles.menuIcon}>
          <Icon name={this.props.navIcon}/>
        </TouchableOpacity>
        <Text style={styles.homeTitle}>Welcome To the Home Page</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navbar : {
    flexDirection : 'row',
    justifyContent : 'flex-start',
    alignItems : 'stretch',
    backgroundColor : '#4d85e2',
    height : 50
  },
  menuIcon : {
    marginLeft: 20,
    marginTop: 10
  },
  homeTitle : {
    fontSize : 20,
    marginLeft : 20,
    marginTop : 10
  }
})
