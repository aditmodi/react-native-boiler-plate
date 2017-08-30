// Creating a component for sign up Form

import React, {Component} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import InputValidation from './inputValidation.js';
import { Form } from './signUpFormDetails.js';
import LinearGradient from 'react-native-linear-gradient';
import GenderRadio from './genderRadio.js';

export default class SignUpForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      fname : '',
      lname : '',
      email : '',
      password : '',
      phone : '',
      gender : ''
    }
  }

  handleChange = () =>{
    // this.setState({
    //   fname : this.fname.state.value,
    //   lname : this.lname.state.value,
    //   email : this.email.state.value,
    //   password : this.password.state.value,
    //   phone : this.phone.state.value,
    //   gender : this.gender.state.value
    // })
  }

  handleSubmit = () => {
    this.setState({
      fname : this.fname.state.value,
      lname : this.lname.state.value,
      email : this.email.state.value,
      password : this.password.state.value,
      phone : this.phone.state.value,
      gender : this.gender.state.value
    })
    console.log('valuess : ', this.state);
    console.log('name : ', this.fname.state.value);
  }

  render(){
    return(
      <LinearGradient colors={['#00bfff', '#87cefa', '#ba55d3']} style={styles.gradient}>
        <ScrollView>
          <KeyboardAvoidingView behaviour="padding">
            {/* <Text style={styles.signUpHeading}>Sign Up Form</Text> */}
            {/* {
              Form.map((item, index) => {
                  if (item.name != 'Gender'){
                    if (item.name == 'Password' || item.name == 'Confirm Password'){
                      return(
                        <InputValidation
                          key={index}
                          type={item.type}
                          ref={(input) => { this[item.ref] = input }}
                          name={item.name}
                          PLACEHOLDER={item.name}
                          Change={this.handleChange}
                          secureTextEntry
                        />
                      )
                    }
                    else {
                      return(
                        <InputValidation
                          key={index}
                          type={item.type}
                          name={item.name}
                          PLACEHOLDER={item.name}
                          Change={this.handleChange}
                        />
                      )
                    }
                  }
                  else if (item.name == 'Gender'){
                    return(
                      <View key={index} style={styles.genderContainer}>
                        <Text style={styles.genderHeading}>{item.name}</Text>
                        <Checkbox
                          labelStyle={styles.checkbox}
                          label='male'
                          onClick={this.genderCheck}
                        />
                        <Checkbox
                          labelStyle={styles.checkbox}
                          label='female'
                          onClick={this.genderCheck}
                        />
                      </View>
                    )
                  }
              })
            } */}
            <InputValidation
              type="text"
              PLACEHOLDER="First Name"
              ref={(input) => {this.fname = input}}
              Change={this.handleChange}
            />
            <InputValidation
              type="text"
              PLACEHOLDER="Last Name"
              ref={(input) => {this.lname = input}}
              Change={this.handleChange}
            />
            <InputValidation
              type="email"
              PLACEHOLDER="email"
              ref={(input) => {this.email = input}}
              Change={this.handleChange}
            />
            <InputValidation
              type="password"
              PLACEHOLDER="Password"
              ref={(input) => {this.password = input}}
              Change={this.handleChange}
            />
            <InputValidation
              type="password"
              PLACEHOLDER="Confirm Password"
              ref={(input) => {this.cPassword = input}}
              Change={this.handleChange}
            />
            <GenderRadio
              ref={(input) => {this.gender = input}}
            />
            <InputValidation
              type="number"
              PLACEHOLDER="phone"
              ref={(input) => {this.phone = input}}
              Change={this.handleChange}
            />
            <TouchableOpacity style={styles.submit} onPress={this.handleSubmit}>
              <Text>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.signInPressed}>
              <Text>Sign-in</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({

  signUpHeading : {
    textAlign : 'center',
    fontWeight : 'bold',
    fontSize : 20,
    color : '#000000'
  },

  gradient : {
    flex : 1
  },
  submit : {
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'space-around',
    // alignItems : 'center',
    borderWidth : 1,
    borderRadius : 20,
    padding : 10,
    marginTop : 10
  }
})
