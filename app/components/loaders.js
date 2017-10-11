import React, { Component } from 'react';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator
} from 'react-native-indicators';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class Loaders extends Component{
  render(){
    return(
      <View style={styles.loader}>
        <BarIndicator/>
        <Text>Loading..</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loader:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
