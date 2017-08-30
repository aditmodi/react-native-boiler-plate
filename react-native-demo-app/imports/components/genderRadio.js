import React, {Component} from 'react';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

var radio_props = [
  {label: 'male', value: 0 },
  {label: 'female', value: 1 }
];

export default class GenderRadio extends Component {
  constructor(props){
    super(props);
    this.state = {
      value : 0
    }
  }

  render(){
    return(
      <View>
        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {this.setState({value:value})}}
        />
      </View>
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
  genderHeading : {
    marginLeft : 10,
    fontWeight : 'bold',
    color : '#000000',
    fontSize : 15
  },
  checkbox : {
    color : '#000000'
  },
})
