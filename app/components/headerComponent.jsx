import React, { Component } from 'react';
import {
  Header,
  Left,
  Title,
  Icon,
  Button,
  Body,
} from 'native-base';
import {
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
});

export default class HeaderComponent extends Component {
  static propTypes = {
    transparent: PropTypes.bool,
    leftPressed: PropTypes.func,
    leftIcon: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    transparent: null,
    leftPressed: null,
    leftIcon: null,
    title: null,
  }

  render() {
    return (
      <Header transparent={this.props.transparent} style={styles.header}>
        <Left>
          <Button transparent onPress={this.props.leftPressed}>
            <Icon name={this.props.leftIcon} />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
      </Header>
    );
  }
}
