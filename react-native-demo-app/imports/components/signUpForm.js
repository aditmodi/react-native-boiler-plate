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
import Checkbox from 'react-native-checkbox';
import InputValidation from './inputValidation.js';
import { Form } from './signUpFormDetails.js';
import LinearGradient from 'react-native-linear-gradient';

export default class SignUpForm extends Component {
  render(){
    return(
      <LinearGradient colors={['#00bfff', '#87cefa', '#ba55d3']} style={styles.gradient}>
        <ScrollView>
          <KeyboardAvoidingView behaviour="padding">
            {/* <Text style={styles.signUpHeading}>Sign Up Form</Text> */}
            {
              Form.map((item, index) => {
                  if (item.name != 'Gender'){
                    if (item.name == 'Password' || item.name == 'Confirm Password'){
                      return(
                        <InputValidation
                          key={index}
                          type={item.type}
                          name={item.name}
                          PLACEHOLDER={item.name}
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
                        />
                        <Checkbox
                          labelStyle={styles.checkbox}
                          label='female'
                        />
                      </View>
                    )
                  }
              })
            }
            <TouchableOpacity style={styles.submit}>
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
  genderContainer : {
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'flex-start'
  },
  signUpHeading : {
    textAlign : 'center',
    fontWeight : 'bold',
    fontSize : 20,
    color : '#000000'
  },
  genderHeading : {
    marginLeft : 10,
    fontWeight : 'bold',
    color : '#000000',
    fontSize : 15
  },
  checkbox : {
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
