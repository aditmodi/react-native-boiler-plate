import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { BackHandler } from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

export default class MapScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null
    }
  }

  componentDidMount() {
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
    this.watchID = navigator.geolocation.watchPosition((position) => {
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
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

  render() {
    return (
      <View style={{flex: 1}}>
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
            image={require('../../android/app/src/main/assets/pin.png')}>
            <View>
              <Text style={{color: '#000'}}>
                { this.state.lastLong } / { this.state.lastLat }
              </Text>
            </View>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});
