import React, {Component} from 'react';
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
          formHorizontal={true}
          initial={'male'}
          animation={'true'}
          labelHorizontal={true}
          onPress={(value) => {this.setState({value:value})}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  genderContainer : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 20
  },
  genderHeading : {
    // marginLeft : 10,
    // fontWeight : 'bold',
    color : '#00008b',
    fontSize : 15
  },
  checkbox : {
    color : '#00008b'
  },
  radio: {
    marginLeft: 50,
    // fontSize: 15
  }
})
