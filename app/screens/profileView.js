import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage,
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  Button,
  Icon
} from 'native-base';
import Address from '../utils/address';
import HeaderComponent from '../components/headerComponent';

export default class ProfileView extends Component {
  constructor(props){
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      phone: null,
      gender: ''
    }
  }

  async componentWillMount(){
    console.log('-------------------');
    const { navigate } = this.props.navigation;
    const checkToken = await AsyncStorage.getItem('jwt', (err, token) => {
      const Id = AsyncStorage.getItem('id', (err, id) => {
        fetch(`${Address.url}api/getUser/${id}`, {
          method: 'GET',
          headers:{
            Accept: 'application/json',
            token: `${token}`
          }
        })
        .then(response => {
          return response.json()})
        .then((res) => {
          this.setState({
            fname: res.user.firstName,
            lname: res.user.lastName,
            email: res.user.email,
            phone: res.user.phone,
            gender: res.user.gender,
          })
        })
        .catch((e) => {
          console.error(e);
        })
      })
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    return(
      <ScrollView style={styles.container}>
        <HeaderComponent
          leftIcon='arrow-back'
          leftPressed={() => navigate('Home')}
          title='Profile View'
        />
        <View style={styles.field}>
          <Text>Name : </Text>
          <Text>{this.state.fname} {this.state.lname}</Text>
        </View>
        <View style={styles.field}>
          <Text>Email : </Text>
          <Text>{this.state.email}</Text>
        </View>
        <View style={styles.field}>
          <Text>Phone : </Text>
          <Text>{this.state.phone}</Text>
        </View>
        <View style={styles.field}>
          <Text>Gender : </Text>
          <Text>{this.state.gender}</Text>
        </View>
        <Button success style={styles.editButton} onPress={() => navigate('Edit')}>
          <Icon
            name='color-wand'
          />
          <Text style={styles.editText}>Edit</Text>
        </Button>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 20
  },
  editButton: {
    alignSelf: 'center',
    padding: 10
  },
  editText: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#ffffff',
    marginBottom: 10,
    backgroundColor: 'transparent'
  }
});
