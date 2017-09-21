import React, {Component} from 'react';
import {
  View,
  Image,
  ScrollView
} from 'react-native';

export default class ImageScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: ''
    }
  }

  componentWillMount() {
    fetch('http://192.168.1.189:3001/api/getPhoto',{
      method: 'GET'
    })
    .then((res) => {
      console.log("response::::", res);
      this.setState({
        url: res._bodyInit
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  renderImages = () => {
    return (
      <Image
        source={{uri:this.state.url}}
      />
    )
  }

  render(){
    return(
      <View>
        <ScrollView>
          {this.renderImages}
        </ScrollView>
      </View>
    )
  }
}
