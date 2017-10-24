import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {
  Button,
} from 'native-base';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    top: 40,
  },
  button: {
    margin: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },

});

export default class HomeContent extends Component {
  static propTypes = {
    cameraPressed: PropTypes.func,
    imagePressed: PropTypes.func,
    mapPressed: PropTypes.func,
  }

  static defaultProps = {
    cameraPressed: null,
    imagePressed: null,
    mapPressed: null,
  }

  render() {
    return (
      <View style={styles.homeContainer}>
        <View style={styles.buttons}>
          <Button success onPress={this.props.cameraPressed} style={styles.button}>
            <Text>Open camera</Text>
          </Button>
          <Button success onPress={this.props.imagePressed} style={styles.button}>
            <Text>Show images</Text>
          </Button>
          <Button success onPress={this.props.mapPressed} style={styles.button}>
            <Text>Open map</Text>
          </Button>
        </View>
      </View>
    );
  }
}
