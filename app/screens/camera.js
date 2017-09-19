import React, { Component } from 'react';
import {
  Icon
} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
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
      //   (data) => {
      //   console.log("data:", data);
      // }
        (data) => {
        //   fetch('http://192.168.1.189:3001/api/addPhoto', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Accept': 'application/json'
        //     },
        //     body: data
        //   })
        //   console.log(data);
        // RNFetchBlob.fetch('POST', 'http://192.168.1.189:3001/api/addPhoto',{
        //   'Dropbox-API-Arg': JSON.stringify({
        //     path: data.path,
        //     mode: 'add',
        //     autorename: true,
        //     mute: false
        //   }),
        //   'Content-Type': 'application/octet-stream'
        // }, base64ImageString)
        // .then((res) => {
        //   console.log("this is the response:", res.json);
        // })
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
        <Icon
          name='camera'
          style={styles.capture}
          onPress={this.takePicture}/>
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
