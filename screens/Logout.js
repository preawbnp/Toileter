import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { logoutUser } from '../actions';
import { Ionicons } from '@expo/vector-icons'

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
      <View style={styles.overviewContainer}>
        <View>
        </View>
        <View>
          <Button
            large
            title="Log out"
            backgroundColor="#00aced"
            icon={{ type: 'font-awesome', color: "#ffffff", name: 'sign-out' }}
            onPress={ () => this.props.logoutUser()  }
          />
        </View>
      </View>
    );
  }
}

const styles = {
  overviewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
}

export default connect(null, {
  logoutUser
})(Logout);
