import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import firebase from 'firebase';
import validator from 'validator';
import { emailChanged, passwordChanged, loginUser, facebookLogin } from '../actions';
import { FormLabel, FormInput, FormValidationMessage, Button, Divider, SocialIcon, Icon } from 'react-native-elements';
import styles from '../stylesheet/style';

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      emailError: '',
      passwordError: '',
      emailFlag: 0,
      passwordFlag: 0
    }
  }

  static navigationOptions = {
     title: 'Login',
     header: null
    //  tabBarVisible: true
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
    this.validateInput('password',text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    if (inputName == 'email') {
      if (validator.isEmail(inputVal)){
        this.setState({ emailError: '' });
        this.setState({ emailFlag: 1 });
      } else {
        this.setState({ emailError: 'Please enter a valid email address'});
        this.setState({ emailFlag: 0 });
      }
    }

    if (inputName == 'password') {
      if (validator.isAscii(inputVal)){
        this.setState({ passwordError: '' });
        this.setState({ passwordFlag: 1 });
      } else {
        this.setState({ passwordError: 'Please enter a valid password'});
        this.setState({ passwordFlag: 0 });
      }
    }
  }

  // Display form validation errors if needed

  renderFormError(inputName) {
    if (inputName == 'email') {
      if (this.state.emailError !='') {
        return (<FormValidationMessage>{this.state.emailError}</FormValidationMessage>);
      }
    }
    if (inputName == 'password') {
      if (this.state.passwordError !='') {
        return (<FormValidationMessage>{this.state.passwordError}</FormValidationMessage>);
      }
    }
    return;
  }

  onNavPress = (screenname) => {
    this.props.navigation.navigate(screenname);
  }

  render() {

    return (
      <KeyboardAwareScrollView>
        <View>
          <Text style = {styles.text_header}>Log In</Text>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}



const mapStateToProps = ({ auth }) => {
  const { email, password, error, user } = auth;
  return { email, password, error, user };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, facebookLogin
})(Login);
