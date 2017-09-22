import React, {Component} from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';

var urls = new Array();

export default class ImageScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: []
    }
  }

  componentWillMount() {
    fetch('http://192.168.1.189:3001/api/getPhoto',{
        method: 'GET'
      })
      .then(response => {return response.json()})
      .then((res) => {
        res.data.map((item, index) => {
          urls[index] = item.img.url
        });
        this.setState({
          url: urls
        });
        console.log("STATE::", this.state.url);
      })
      .catch(err => {
        console.log(err);
      })
  }

  renderImages = (url, i) => {
    return(
      <View key={i}>
        <Image
          style={styles.image}
          source={{uri: url}}
        />
        <Text>{url}</Text>
      </View>

    )
  }

  render(){
    return(
        <ScrollView>
          {
            this.state.url.map((item, i) => {
              return this.renderImages(item, i)
            })
          }
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    height: 200,
    width: 200,
    backgroundColor: '#000000',
    padding: 20,
    margin: 20,
  }
})
