import React, { Component } from 'react';
import { View, Text, AppRegistry, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import firebase from 'firebase';
import validator from 'validator';
import { emailChanged, passwordChanged, loginUser, facebookLogin } from '../actions';
import { FormLabel, FormInput, FormValidationMessage, Button, Divider, SocialIcon, Icon } from 'react-native-elements';
// import styles from '../stylesheet/style';
import styles from '../stylesheet/LoginScreen';

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
      // <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.container_head}>
              <Text style={styles.text_header}>Log In</Text>
          </View>

          <View style={styles.container_form}>
            <FormLabel>Enter Email</FormLabel>
            <FormInput
              value={this.props.email}
              placeholder='email@email.com'
              onChangeText={email => this.onEmailChange(email)}
              onBlur={() => {
                this.validateInput('email', this.props.email);
              }}
            />
            <View>
              { this.renderFormError('email') }
            </View>

            <FormLabel>Enter Password</FormLabel>
              <FormInput
                value={this.props.password}
                placeholder='●●●●'
                onChangeText={password => this.onPasswordChange(password)}
                secureTextEntry={true}
                onBlur={() => {
                  this.validateInput('password', this.props.password);
                }}
              />
              <View>
                { this.renderFormError('password') }
              </View>
              
              <View style={styles.text_or}>
                <Text> - or - </Text>
              </View>
              <View style={styles.btn_facebook}>
                <SocialIcon
                  title="Sign In With Facebook"
                  button
                    fontWeight="400"
                    type="facebook"
                  onPress={ () => this.props.facebookLogin() }
                />
              </View>
          </View>

          <View style={styles.container_link}>
            <Button
              title = "Don't already have an account?"
              backgroundColor = "#ffffff"
              color = "#000000"
              fontSize = '14'
              onPress={ () => this.onNavPress('register_scr') }
            />
          </View>

          <View style={styles.container_button}>
            <Button
              title = "Log In"
              backgroundColor = "#74DAFF"
              onPress={this.onButtonPress.bind(this)}
              disabled={!(this.state.emailFlag && this.state.passwordFlag)}
            />
          </View>
        </View>
      // </KeyboardAwareScrollView>
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
