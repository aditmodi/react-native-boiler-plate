import React, { Component } from 'react';
import {
  Icon
} from 'native-base';
import RNFS from 'react-native-fs';
import Camera from 'react-native-camera';
import {
  View,
  StyleSheet,
  Text,
  ImageStore
} from 'react-native';

var picturePath;
let pic;

export default class CameraScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      uri:''
    }
  }

  takePicture = () => {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then(
        async(data) => {
          console.log('data:', data);
          pic = data;
          picturePath = await RNFS.readFile(data.path, 'base64');
          // picturePath = data.path;
        }
      )
      .then(res => {
        // ImageStore.addImageFromBase64(picturePath, (result) => {console.log(result)}, (error) => {console.error(error)});
      })
      .then(res => {

      })
      .catch(err => console.error(err));
  }

  storePicture = () => {
    console.log("picture path:", picturePath);
    if (picturePath) {
      // var data = new FormData();
      // data.append('photo',
      //   picturePath
      // );


      const config = {
        method: 'POST',
         headers: {
          //  'Accept': 'application/json',
           'Content-Type': 'application/json',
          //  'Authorization': 'Bearer ' + 'SECRET_OAUTH2_TOKEN_IF_AUTH',
         },
         body: JSON.stringify({
           data: picturePath
         })
      }

      fetch('http://192.168.1.189:3001/api/addPhoto', config)
      .then((responseData) => {
         console.log("this is the response:::",responseData._bodyInit);
        //  ImageStore.addImageFromBase64(responseData._bodyInit, (result) => { console.log("working", result) }, (error) => { console.error(error); });
       })
     .catch(err => {
         console.log("YOYOY:",err);
       })
     }

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
        <View style={styles.iconContainer}>
          <Icon
            name='camera'
            style={styles.iconCam}
            onPress={this.handlePhoto}/>
          <Icon
            name='radio-button-on'
            style={styles.iconCam}
            onPress={this.takePicture}/>
          <Icon
            name='arrow-up'
            style={styles.iconCam}
            onPress={this.storePicture}/>
          <Icon
            name='videocam'
            style={styles.iconCam}
            onPress={this.handleVideo}/>
        </View>
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
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  iconCam: {
    padding: 20,
    backgroundColor: '#ffffff'
  }
});
