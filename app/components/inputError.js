import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  error: {
    color: 'red',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
});

export default class InputError extends Component {
  static propTypes = {
    errorVisible: PropTypes.bool,
    errorMessage: PropTypes.string,
  }

  static defaultProps = {
    errorVisible: null,
    errorMessage: null,
  }

  render() {
    if (this.props.errorVisible === true) {
      return <Text style={styles.error}>{this.props.errorMessage}</Text>;
    }

    return false;
  }
}
