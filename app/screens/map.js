import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  Alert,
  Platform
} from 'react-native';
import { BackHandler } from 'react-native';
import {
  Header,
  Item,
  Input,
  Icon,
  Right,
  Content,
  Container,
  Button
} from 'native-base';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Geocoder from 'react-native-geocoding';

let place;

export default class MapScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      label: null,
      visible: false
    }
  }

  componentDidMount() {
    console.log("Platform:", Platform.OS);
    if(Platform.OS === 'android'){
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
          message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
          ok: "YES",
          cancel: "NO",
          enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
          showDialog: true // false => Opens the Location access page directly
      }).then(function(success) {
          console.log(success); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}

      }).catch((error) => {
          console.log(error.message); // error.message => "disabled"
      });

      BackHandler.addEventListener('hardwareBackPress', () => {
         LocationServicesDialogBox.forceCloseDialog();
      });
    }

    this.watchID = navigator.geolocation.watchPosition((position) => {
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5,
      }
      this.onRegionChange(region, region.latitude, region.longitude);
    });

  }

  onRegionChange = (region, lastLat, lastLong) => {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  handleChange = (text) => {
    place = text;
  }

  getCoord = () => {
    console.log("hasdhjsadhj", place);
    Geocoder.setApiKey(' AIzaSyCZj_5POs51Xxr6IYFvIfGp1DiPzEl0WVk ');
    Geocoder.getFromLocation(place).then(
      json => {
        var location = json.results[0].geometry.location;
        // alert(location.lat + ", " + location.lng);
        let region = {
          latitude:       location.lat,
          longitude:      location.lng,
          latitudeDelta:  0.00922*1.5,
          longitudeDelta: 0.00421*1.5,
        }
        this.onRegionChange(region, region.latitude, region.longitude);
      },
      error => {
        alert(error);
      }
    );
  }



  saveLabel = async() => {
    let id = await AsyncStorage.getItem('id');
    fetch('http://192.168.1.189:3001/api/setLabel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id,
        label: 'Home',
        latitude: this.state.lastLat,
        longitude: this.state.lastLong
      })
    })
    .then((response) => Alert.alert('Label saved'))
    .catch((e) => {
      console.log(e);   //triggers when there is server issue
    });
    this.setState({
      visible: false
    });
  }

  labelPressed = () => {
    console.log("PRESSED");
    this.saveLabel();
  }

  // renderMenu = () => {
  //     return(
  //       <View>
  //         <Button>
  //           <Text>Set Home?</Text>
  //         </Button>
  //       </View>
  //     )
  // }
  // renderLabel = () => {
  //   return(
  //     <Item style={styles.inputLabel}>
  //       <Input
  //         placeholder="Try home"
  //         onChangeText={text => this.handleLabelChange(text)}
  //       />
  //       <Button onPress={this.saveLabel}>
  //         <Text>Set</Text>
  //       </Button>
  //     </Item>
  //   )
  // }

  renderMap = () => {
    return(
      <View style={{flex: 1}}>
        <Container style={styles.header}>
          <Header searchBar rounded>
            <Item>
              <Button transparent
                onPress={() => navigate('Profile')}
                >
                  <Icon name='arrow-back'/>
                </Button>
                <Input placeholder="Search"
                  onChangeText={text => this.handleChange(text)}
                />
                <Button transparent>
                  <Icon name="ios-search"
                    onPress={this.getCoord}
                  />
                </Button>
                <Button transparent>
                  <Icon name="more"
                    onPress={this.openMore}
                  />
                  <View></View>
                </Button>
              </Item>
            </Header>
          </Container>
          <MapView
            style={styles.map}
            region={this.state.mapRegion}
            showsUserLocation={true}
            followUserLocation={true}
            onRegionChange={this.onRegionChange.bind(this)}>
            <MapView.Marker
              coordinate={{
                latitude: (this.state.lastLat + 0.00050) || -36.82339,
                longitude: (this.state.lastLong + 0.00050) || -73.03569,
              }}
              image={require('../../android/app/src/main/assets/pin.png')}
              >
                <MapView.Callout onPress={this.labelPressed}>
                  <Button>
                    <Text>Set Home?</Text>
                  </Button>
                </MapView.Callout>
              </MapView.Marker>
            </MapView>
          </View>
    )
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        {this.renderMap()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    height: 50
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    top: 50,
  },
  header: {
    backgroundColor: '#ffffff'
  },
  bubble: {
    backgroundColor: '#ffffff',
    height: 100,
    width: 100
  },
  inputLabel: {
    flex: 1
  }
});
