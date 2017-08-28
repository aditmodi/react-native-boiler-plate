import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

export default class LogoContainer extends Component {
  render(){
    return(
      <View style={styles.logoContainer}>
        <Image
          source = {this.props.image}
          style = {styles.logo}
        />
        <Text style={styles.title}>
          Welcome.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logoContainer : {
    flex : 1,
    flexDirection : 'column',
    justifyContent : 'flex-start',
    alignItems : 'center',
    marginTop : 50
  },
  logo : {
    width : 100,
    height :100
  },
  title : {
    fontSize : 25,
    fontStyle : 'italic',
    textAlign : 'center',
    width : 200
  }
})
