import React, {Component} from 'react';
//used Radio library from npm
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

var radio_props = [
  {label: 'male', value: 'male' },
  {label: 'female', value: 'female' }
];

//this class is for gender field
export default class GenderRadio extends Component {
  constructor(props){
    super(props);
    this.state = {
      value : 'male'
    }
  }

  render(){
    return(
      <View style={styles.genderContainer}>
        <Text style={styles.genderHeading}>Gender</Text>
        <RadioForm
          style={styles.radio}
          radio_props={radio_props}
          formHorizontal={true}                       //radioboxes direction
          initial={'male'}
          // animation={'true'}
          labelHorizontal={true}                      //radiobox label direction
          onPress={(value) => {this.setState({value:value})}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  genderContainer : {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20
  },
  genderHeading : {
    // marginLeft : 10,
    // fontWeight : 'bold',
    // color : '#00008b',
    fontSize : 17
  },
  checkbox : {
    color : '#00008b'
  },
  radio: {
    marginLeft: 50,
    // fontSize: 15
  }
})
