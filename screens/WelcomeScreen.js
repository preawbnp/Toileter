import React, { Component } from 'react';
import { View, Text, Dimensions, rgba, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { AppLoading } from 'expo';
import styles from '../stylesheet/WelcomeScreen';

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
    console.log('-------------------------------------');

    return (
      // <View style = {styles.container_screen}>
      //   <View style = {{flex: 9, alignItems: 'center'}}>
      //     <Image source = {image} style={styles.img_logo_welcome}/>
      //   </View>
      //   <View style = {styles.btn_start_welcome}>
      //     <Button
      //       onPress = {() => this.onButtonPress('login_scr')}
      //       title = "Start!"
      //       color = "#ffffff"
      //     />
      //   </View>
      // </View>

      <View style={styles.container_welcome1}>
        <View style={styles.container_welcome2}>
          <Image source = {image} style={styles.img_logo}/>
        </View>
        <View style={styles.container_welcome3}>
          <View style = {styles.btn_start_welcome}>
            <Button
              onPress = {() => this.onButtonPress('login_scr')}
              title = "Start!"
              color = "#ffffff"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default WelcomeScreen;

