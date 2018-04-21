import React, { Component } from 'react';
import { View, Text, Dimensions, rgba, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { AppLoading } from 'expo';
import styles from '../stylesheet/style';

var image = require('../images/logo2.png');

class WelcomeScreen extends Component {

  static navigationOptions = {
    header: null
  };


  onButtonPress = (screenname) => {
    this.props.navigation.navigate(screenname);
  };



  render() {

    console.log('-------------------------------------');
    console.log("Welcome Screen: Render: App loading status display");

    return (
      <View style={styles.wel_container}>
        <View style={{flex: 9, alignItems: 'center'}}>
          <Image source={image} style={styles.wel_logo}/>
        </View>
        <View style={styles.wel_start_btn}>
          <Button
            onPress={() => this.onButtonPress('login_scr')}
            title="Start!"
            color="#ffffff"
          />
        </View>
      </View>
    );
  }
}

export default WelcomeScreen;

