import React, { Component } from 'react';
import Camera from 'react-native-camera';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

export default class CameraScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      mode : 'Camera.constants.CaptureMode.still'
    }
  }

  takePicture = () => {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then(
        (data) => {
          fetch('http://192.168.1.189:3001/api/addPhoto', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: data
          })
          console.log(data);
        }
      )
      .catch(err => console.error(err));
  }

  handlePhoto = () => {
    this.setState({
      mode: 'Camera.constants.CaptureMode.video'
    });
    console.log("Camera");
  }

  handleVideo = () => {
    this.setState({
      mode: 'Camera.constants.CaptureMode.still'
    });
    console.log("Video");
  }

  render(){
    return(
      <View style={styles.container}>
        <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        captureMode={Camera.constants.CaptureMode.still}>
        <Text onPress={this.handlePhoto}>Photo</Text>
        <Text
          style={styles.capture}
          onPress={this.takePicture}>[CAPTURE]</Text>
        <Text onPress={this.handleVideo}>Video</Text>
      </Camera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
