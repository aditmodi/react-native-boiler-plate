import React, {Component} from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  AsyncStorage
} from 'react-native';
import HeaderComponent from '../components/headerComponent';

var urls = new Array();

export default class ImageScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: []
    }
  }

  async componentWillMount() {
    let hello = AsyncStorage.getItem('email', (err, email) => {
      console.log("this is the email we get on client side--->", email);
      fetch(`http://192.168.1.189:3001/api/getPhoto/${email}`,{
        method: 'GET'
      })
      .then(response => {return response.json()})
      .then((res) => {
        console.log("this is the response:::", res);
        res.data.map((item, index) => {
          urls[index] = item.img.url
        });
        this.setState({
          url: urls
        });
        console.log("STATE::", this.state.url);
        urls = new Array();
      })
      .catch(err => {
        console.log(err);
      })
    });
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
    const { navigate } = this.props.navigation;
    return(
        <View>
          <HeaderComponent
            leftIcon='arrow-back'
            leftPressed={() => navigate('Profile')}
            title='Images'
          />
          <ScrollView>
            {
              this.state.url.map((item, i) => {
                return this.renderImages(item, i)
              })
            }
          </ScrollView>
        </View>
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
