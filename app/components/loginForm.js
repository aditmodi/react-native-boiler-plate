import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Form,
  Button,
  Text
} from 'native-base';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView
} from 'react-native';
import InputField from './input';

export default class LoginForm extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    loginEmail: PropTypes.func,
    loginPass: PropTypes.func,
    loginPressed: PropTypes.func,
    forgotPassPressed: PropTypes.func,
    signUpPressed: PropTypes.func,
  }

  static defaultProps = {
    //
  }

  render(){
    return(
      <View style={styles.Container}>
        <ScrollView>
        <View style={styles.heading}>
          <Image
            style={styles.headLogo}
            source={require('../img/ss_logo.png')}
          />
          <View style={styles.headingText}>
            <Text style={styles.mainHead}>Successive Softwares</Text>
            <Text style={styles.subHead}>Let your neurons run.</Text>
          </View>
        </View>
        <KeyboardAvoidingView behaviour="padding">

            <Form>
              <View style={styles.formContainer}>
                <InputField
                  type="email"
                  label='Email'
                  ref={this.props.loginEmail}
                />
                <InputField
                  type="password"
                  secure
                  label='Password'
                  ref={this.props.loginPass}
                />
                <Button success large
                  style={styles.loginButton}
                  onPress={this.props.loginPressed}>
                  <Text style={styles.loginText}>Login</Text>
                </Button>

                <View style={styles.extraContainer}>
                  <Button transparent success small
                    onPress={this.props.forgotPassPressed}>
                    <Text>forgot password?</Text>
                  </Button>
                  <Button transparent success small
                    onPress={this.props.signUpPressed}>
                    <Text>New user? sign-up</Text>
                  </Button>
                </View>
                </View>
            </Form>

        </KeyboardAvoidingView>
        </ScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: '#ffffff'
  },
  formContainer: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: 50
  },
  loginButton: {
    height: 40,
    width: 80,
    alignSelf: 'center',
    marginTop: 20
  },
  loginText: {
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
  extraContainer: {
    alignSelf: 'center',
    marginTop: 30
  },
  heading: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headingText: {
    flex: 1
  },
  mainHead: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  subHead: {
    textAlign: 'left'
  }
})
