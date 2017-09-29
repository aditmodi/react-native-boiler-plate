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

let urls = new Array();
const height = 200;
const width = 200;

export default class ImageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  async componentWillMount() {
    const hello = AsyncStorage.getItem('email', (err, email) => {
      console.log('this is the email we get on client side--->', email);
      fetch(`http://192.168.1.189:3001/api/getPhoto/${email}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then((res) => {
          console.log('this is the response:::', res);
          let n;
          let str;
          res.data.map((item, index) => {
            n = item.img.url.lastIndexOf('upload');
            str = `${item.img.url.slice(0, n + 6)}/w_${width},h_${height}${item.img.url.slice(n + 6)}`;
            urls[index] = str;
          });
          this.setState({
            url: urls,
          });
          console.log('STATE::', this.state.url);
          urls = new Array();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  renderImages = (url, i) => (
    <View key={i}>
      <Image
        style={styles.image}
        source={{ uri: url }}
      >
        {this.state.isLoading ? <ActivityIndicator style={{ padding: 20 }} /> : null}
      </Image>
      <Text>{url}</Text>
    </View>

  )

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <HeaderComponent
          leftIcon="arrow-back"
          leftPressed={() => navigate('Profile')}
          title="Images"
        />
        <ScrollView>
          {
            this.state.url.map((item, i) => this.renderImages(item, i))
          }
        </ScrollView>
      </View>
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
});
