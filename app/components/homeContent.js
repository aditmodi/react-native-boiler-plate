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
  buttons: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    top: 40
  },
  button: {
    margin: 20,
    flexDirection: 'row',
    alignSelf: 'center'
  }

});

export default class HomeContent extends Component {
  render() {
    return (
      <View style={styles.homeContainer}>
          <HeaderComponent
            leftIcon='arrow-back'
            leftPressed={() => navigate('Home')}
            title='Profile'
          />
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
