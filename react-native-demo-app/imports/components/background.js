import React, { Component } from 'react';
import {
  Image,
  StyleSheet
} from 'react-native';

export default class BackgroundImage extends Component {
  render() {
    return (
      <Image
        source={require('../img/nodejs-icon.svg')}
        style={styles.backgroundImage}
        >{this.props.children}
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover'
  }
})
