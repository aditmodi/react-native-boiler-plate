import React, { Component } from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import HeaderComponent from '../components/headerComponent';
import Loaders from '../components/loaders';
import Address from '../utils/address';

let urls = new Array();
const height = 200;
const width = 200;

export default class ImageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: [],
      data: true
    };
  }

  async componentWillMount() {
    const hello = await AsyncStorage.getItem('id', (err, id) => {
      console.log('this is the email we get on client side--->', id);
      const hello2 = AsyncStorage.getItem('jwt', (err, token) => {
        fetch(`${Address.url}api/getPhoto/${id}`, {
          method: 'GET',
          headers: {
            token: token
          }
        })
        .then(response => response.json())
        .then((res) => {
          console.log('this is the response:::', res);
          let n;
          let str;
          console.log("SADSADSADS",res.data);
            res.data.map((item, index) => {
              n = item.img.url.lastIndexOf('upload');
              str = `${item.img.url.slice(0, n + 6)}/w_${width},h_${height}${item.img.url.slice(n + 6)}`;
              urls[index] = str;
            });
            this.setState({
              url: urls,
            });
            console.log('STATE::', this.state.url);
            if(this.state.url.length === 0){
              this.setState({
                data: false
              })
            }
            urls = new Array();
        })
        .catch((err) => {
          console.log(err);
        });
      })
    });
  }

  renderNoImage = () => (
      <View style={styles.noImageContainer}>
        <Image
          style={styles.noImage}
          source={require('../img/noImage.png')}
        />
        {/* <Text>No image available</Text> */}
      </View>
    )


  renderImages = (url, i) => (
    <View key={i}>
      <Image
        style={styles.image}
        source={{ uri: url }}/>
      <Text>{url}</Text>
    </View>

  )

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
      <View>
        <HeaderComponent
          leftIcon="arrow-back"
          leftPressed={() => navigate('Profile')}
          title="Images"
        />
          {
            this.state.data ? this.state.url.map((item, i) => {this.renderImages(item, i)}) : this.renderNoImage()
          }
      </View>
    </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    height,
    width,
    backgroundColor: '#000000',
    padding: 20,
    margin: 20,
  },
  noImage: {
    alignSelf: 'center',
    height: 300,
    width,
    padding: 20,
    margin: 20,
  },
  noImageContainer: {
    flex: 1,
    top:50
  }
});
