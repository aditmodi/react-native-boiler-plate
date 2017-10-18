import React, { Component } from 'react';
import {
  ScrollView,
  View,
  AsyncStorage,
  StyleSheet,
  Text,
  Alert,
  Picker
} from 'react-native';
import {
  Button,
  Label
} from 'native-base';
import {
  email,
  alphaNumeric,
  onlyNumber,
  passMatch,
} from '../utils/validations';
import InputField from '../components/input';
import GenderRadio from '../components/genderRadio';
import Address from '../utils/address';
import HeaderComponent from '../components/headerComponent';

let num;

export default class EditForm extends Component {
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
    // console.log('-------------------');
    const { navigate } = this.props.navigation;
    const checkToken = await AsyncStorage.getItem('jwt', (err, token) => {
      // console.log('^^^^^^^^', token);
      const Id = AsyncStorage.getItem('id', (err, id) => {
        // console.log('&&&&&&&&&&&&', id);
        fetch(`${Address.url}api/getUser/${id}`, {
          method: 'GET',
          headers:{
            Accept: 'application/json',
            token: `${token}`
          }
        })
        .then(response => {
          console.log('{{{{{{}}}}}}', response);
          return response.json()})
        .then((res) => {
          console.log('******', res);
          if(res.user.gender == 'female'){
            num = 1;
          }
          if(res.user.gender == 'male'){
            num = 0;
          }
          this.setState({
            fname: res.user.firstName,
            lname: res.user.lastName,
            email: res.user.email,
            phone: (res.user.phone).toString(),
            gender: res.user.gender,
          })
        })
        .catch((e) => {
          console.error(e);
        })
      })
    });
  }

  updateChange = async () => {
    const { navigate } = this.props.navigation;
    let f = this.fname.state;
    let l = this.lname.state;
    let e = this.email.state;
    let p = this.phone.state;
    // let g = this.gender.state;
    let g = this.state.gender;
    let fv = alphaNumeric(f.value);
    let lv = alphaNumeric(l.value);
    let ev = email(e.value);
    let pv = onlyNumber(p.value);
    console.log('----', f.value);
    console.log('----', l.value);
    console.log('----', e.value);
    // console.log('----', g.value);
    console.log('fname', fv);
    console.log('fname', lv);
    console.log('fname', ev);
    console.log('fname', pv);
    // if (fv === true && lv === true && ev === true && pv === true) {
      const checkToken = await AsyncStorage.getItem('jwt', (err, token) => {
        console.log('^^^^^^^', token);
        const Id = AsyncStorage.getItem('id', (err, id) => {
          console.log('&&&&&&&', id);
          fetch(`${Address.url}api/updateUser/${id}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              token: `${token}`
            },
            body: JSON.stringify({
              fname: f.value,
              lname: l.value,
              email: e.value,
              phone: Number(p.value),
              gender: g,
            })
          })
          .then((response) => {
            return response.json();
          })
          .then((res) => {
            Alert.alert(res.message);
            if(res.success == true){
              navigate('ProfileView')
            }
          })
          .catch((e) => {
            console.error(e);
          })
        })
      })
    // }
    // else {
    //   Alert.alert('Resolve the highlighted errors')
    // }
  }

  render(){
    const { navigate } = this.props.navigation;
    console.log('!!!12@@@@@@@@@@', this.state.gender);
    let male = 'male'
    return(
      <ScrollView>
        <HeaderComponent
          leftIcon='arrow-back'
          leftPressed={() => navigate('ProfileView')}
          title='Edit Form'
        />
        <InputField
          type='text'
          label='First Name'
          value={this.state.fname}
          ref={(input) => { this.fname = input; }}
          float={false}
          stacked={true}
        />
        <InputField
          type='text'
          label='Last Name'
          value={this.state.lname}
          ref={(input) => { this.lname = input }}
          float={false}
          stacked={true}
        />
        <InputField
          type='email'
          label='Email'
          value={this.state.email}
          ref={(input) => { this.email = input }}
          float={false}
          stacked={true}
        />
        <InputField
          type='number'
          label='Phone'
          value={this.state.phone}
          ref={(input) => { this.phone = input }}
          float={false}
          stacked={true}
        />
        <Label>Gender</Label>
        <Picker
          selectedValue={this.state.gender}
          onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}
          >
          <Picker.Item label='male' value='male'/>
          <Picker.Item label='female' value='female'/>
        </Picker>
        <View style={styles.buttons}>
          <Button style={styles.button} success onPress={this.updateChange}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </Button>
          <Button style={styles.button} danger onPress={() => navigate('ProfileView')}>
            <Text style={styles.buttonText}>Discard</Text>
          </Button>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  button: {
    margin: 20
  },
  buttonText: {
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: 'transparent',
    padding: 10,
    color: '#ffffff'
  }
})
