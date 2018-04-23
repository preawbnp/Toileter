import React, { Component } from 'react';
import { View, Text, TextInput, Linking } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import validator from 'validator';
import { emailChanged, passwordChanged, firstnameChanged, lastnameChanged, signupUser, facebookLogin } from '../actions';
import { FormLabel, FormInput, FormValidationMessage, Button, Divider, SocialIcon, Icon } from 'react-native-elements';
import styles from '../stylesheet/Register';

class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      emailError: '',
      firstnameError: '',
      lastnameError: '',
      passwordError: '',
      emailFlag: 0,
      firstnameFlag: 0,
      lastnameFlag: 0,
      passwordFlag: 0
    }
  }

  static navigationOptions = {
     title: 'Register',
     header: null
  }

  // Call action if the value is changed

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
    this.validateInput('password',text);
  }

  onFirstnameChange(text) {
    this.props.firstnameChanged(text);
  }

  onLastnameChange(text) {
    this.props.lastnameChanged(text);
  }

  onButtonPress() {
    const { email, password, firstname, lastname } = this.props;
    this.props.signupUser({ email, password, firstname, lastname });
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

    if (inputName == 'firstname') {
      if (validator.isAscii(inputVal)){
        this.setState({ firstnameError: '' });
        this.setState({ firstnameFlag: 1 });
      } else {
        this.setState({ firstnameError: 'Please enter your First Name'});
        this.setState({ firstnameFlag: 0 });
      }
    }

    if (inputName == 'lastname') {
      if (validator.isAscii(inputVal)){
        this.setState({ lastnameError: '' });
        this.setState({ lastnameFlag: 1 });
      } else {
        this.setState({ lastnameError: 'Please enter your Last Name'});
        this.setState({ lastnameFlag: 0 });
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
    if (inputName == 'firstname') {
      if (this.state.firstnameError !='') {
        return (<FormValidationMessage>{this.state.firstnameError}</FormValidationMessage>);
      }
    }
    if (inputName == 'lastname') {
      if (this.state.lastnameError !='') {
        return (<FormValidationMessage>{this.state.lastnameError}</FormValidationMessage>);
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
      <View style={styles.container}>
          <View style={styles.container_head}>
              <Text style={styles.text_header}>Sign Up</Text>
          </View>

          <View style={styles.container_form}>
          {/* <View style={styles.container_group}> */}
            <FormLabel>Enter First Name</FormLabel>
            <FormInput
              value={this.props.firstname}
              placeholder='John'
              onChangeText={firstname => this.onFirstnameChange(firstname)}
              onBlur={() => {
                this.validateInput('firstname', this.props.firstname);
              }}
            />
            <View>
              { this.renderFormError('firstname') }
            </View>

            <FormLabel>Enter Last Name</FormLabel>
            <FormInput
              value={this.props.lastname}
              placeholder='Doe'
              onChangeText={lastname => this.onLastnameChange(lastname)}
              onBlur={() => {
                this.validateInput('lastname', this.props.lastname);
              }}
            />
            <View>
              { this.renderFormError('lastname') }
            </View>
          {/* </View> */}

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

            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>
              
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
              title = "Already have an account?"
              backgroundColor = "#ffffff"
              color = "#000000"
              fontSize = '14'
              onPress={ () => this.onNavPress('login_scr') }
            />
          </View>

          <View style={styles.container_button}>
            <Button
              title = "Sign Up"
              backgroundColor = "#74DAFF"
              onPress={this.onButtonPress.bind(this)}
              disabled={!(this.state.emailFlag && this.state.passwordFlag)}
            />
          </View>
        </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, firstname, lastname, error } = auth;
  return { email, password, error, firstname, lastname };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, firstnameChanged, lastnameChanged, signupUser, facebookLogin
})(Register);
