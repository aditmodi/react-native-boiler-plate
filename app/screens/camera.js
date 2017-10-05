import React, { Component } from 'react';
import {
  Icon,
  Button,
} from 'native-base';
import RNFS from 'react-native-fs';
import Camera from 'react-native-camera';
import {
  View,
  StyleSheet,
  Text,
  Image,
  AsyncStorage,
  Alert,
  ActivityIndicator
} from 'react-native';

let picturePath;
let pic;

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  takePicture = () => {
    const options = {};
    // options.location = ...
    this.camera.capture({ metadata: options })
      .then(
        async (data) => {
          console.log('data:', data);
          this.setState({
            path: data.path,
          });
          pic = data;
          picturePath = await RNFS.readFile(data.path, 'base64');
          // picturePath = data.path;
        },
      )
      .then(res => {
        // console.log(res.json());
      })
      .catch(err => console.error(err));
  }

  storePicture = async () => {
    this.setState({
      isLoading: false,
    });
    console.log('picture path:', picturePath);
    const hello = AsyncStorage.getItem('id', (err, id) => {
      console.log('id', id);
      if (picturePath) {
        const config = {
          method: 'POST',
          headers: {
            //  'Accept': 'application/json',
            'Content-Type': 'application/json',
            //  'Authorization': 'Bearer ' + 'SECRET_OAUTH2_TOKEN_IF_AUTH',
          },
          body: JSON.stringify({
            data: picturePath,
            id,
          }),
        };

        fetch('http://192.168.1.189:3001/api/addPhoto', config)
          .then((responseData) => {
            console.log('this is the response:::', responseData._bodyInit);
            Alert.alert('Image has been uploaded');
            this.setState({ path: null });
          //  ImageStore.addImageFromBase64(responseData._bodyInit, (result) => { console.log("working", result) }, (error) => { console.error(error); });
          })
          .catch((err) => {
            console.log('YOYOY:', err);
          });
      }
    });
  }

  // handlePhoto = () => {
  //   this.setState({
  //     mode: 'Camera.constants.CaptureMode.video'
  //   });
  //   console.log("Camera");
  // }
  //
  // handleVideo = () => {
  //   this.setState({
  //     mode: 'Camera.constants.CaptureMode.still'
  //   });
  //   console.log("Video");
  // }

  returnToCamera = () => {
    this.setState({
      path: null,
    });
  }

  renderImage = () => (
    <View style={styles.imageCont}>
      <Image
        source={{ uri: this.state.path }}
        style={styles.image}
      >
        <View style={styles.imageButtons1} />
        <View style={styles.imageButtons2}>
          <Button
            danger
            style={styles.button}
            onPress={this.returnToCamera}
          >
            <Icon name="close" />
            <Text>Cancel</Text>
          </Button>
          <Button
            success
            style={styles.button}
            onPress={this.storePicture}
          >
            <Icon name="arrow-round-up" />
            <Text>Upload</Text>
          </Button>
        </View>
      </Image>
    </View>
  )

  renderCamera = () => {
    const { navigate } = this.props.navigation;
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        captureMode={Camera.constants.CaptureMode.still}
        captureTarget={Camera.constants.CaptureTarget.disk}
      >
        <View style={styles.iconContainer}>
          <Icon
            dark
            name="arrow-back"
            style={styles.iconCam}
            onPress={() => navigate('Profile')}
          />
          <Icon
            name="radio-button-on"
            style={styles.iconCapture}
            onPress={this.takePicture}
          />
          <Icon
            name="arrow-forward"
            style={styles.iconCam}
            onPress={() => navigate('Images')}
          />
        </View>
      </Camera>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.state.isLoading ? <ActivityIndicator style={{ padding: 20 }} /> : this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  imageCont: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  iconCam: {
    padding: 20,
    color: '#ffffff',
    marginTop: 20,
    alignSelf: 'flex-start',
    // backgroundColor: '#ffffff'
  },
  iconCapture: {
    padding: 20,
    color: '#ffffff',
    fontSize: 70,
    alignSelf: 'center',
  },
  backarrow: {
    alignSelf: 'flex-start',
  },
  imageButtons1: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  imageButtons2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  button: {
    padding: 20,
    margin: 10,
  },
});
