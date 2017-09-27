import React, { Component } from 'react';
import {
  Header,
  Left,
  Right,
  Title,
  Icon,
  Button,
  Body,
} from 'native-base';
import {
  StyleSheet
} from 'react-native';

export default class HeaderComponent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Header transparent={this.props.transparent} style={styles.header}>
        <Left>
          <Button transparent onPress={this.props.leftPressed}>
            <Icon name={this.props.leftIcon}/>
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
      </Header>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  }
})
