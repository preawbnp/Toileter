import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { logoutUser } from '../actions';
import { Ionicons } from '@expo/vector-icons';
import styles from '../stylesheet/Logout';

class Logout extends Component {

  // Donot show header 
  static navigationOptions = {
    title:'Logout',
    header: null,
    tabBarIcon: ({focused}) => (
      <Ionicons
          name={focused ? 'ios-log-out' : 'ios-log-out-outline'}
          size={26}
          style={{ color: focused ? '#33A3F4' : '#949494', marginTop: 10}}
      />
    ),
  };

  render() {
    return (
      <View style={styles.logoutContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>Are you sure to logout?</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button style={styles.logoutBtn}
            title="Log out"
            backgroundColor="#74DAFF"
            icon={{ type: 'font-awesome', color: "#ffffff", name: 'sign-out' }}
            onPress={ () => this.props.logoutUser()  }
          />
        </View>
      </View>
    );
  }
}

export default connect(null, {
  logoutUser
})(Logout);
