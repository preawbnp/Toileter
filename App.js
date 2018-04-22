import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';

import { LOGIN_STATUS_CHANGED } from './actions/types';
import { config } from './consts';
import firebase from 'firebase';
import reducers from './reducers';
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/Login';
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/Home';
import ListToiletScreen from './screens/ListToilet';
import LogoutScreen from './screens/Logout';
import styles from './stylesheet/style';
//import Test from './screens/Test';


export default class App extends React.Component {

  //state = { loggedIn: true };

  constructor(props) {
    super(props);
    this.store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  }

  componentWillMount() {

    console.log(config);
    firebase.initializeApp(config);

  }

  render() {
    const MainNavigator = StackNavigator({
      loading_scr: { screen: LoadingScreen },
      welcome_scr: { screen: WelcomeScreen },
      register_scr: { screen: RegisterScreen },
      login_scr: { screen: LoginScreen },
      main_scr: {
          screen: TabNavigator({
            Home: { screen: HomeScreen },
            List: { screen: ListToiletScreen },
            logout_scr: { screen: LogoutScreen },
          },
          {
            tabBarOptions: {
              labelStyle: { fontSize: 12 }
            },
            swipeEnabled: false,
            tabBarPosition: 'bottom',
          })
        }
      },
      {
        navigationOptions: {
          tabBarVisible: false
        },
        swipeEnabled: false,
        lazy: true
      });

      return (
        <Provider store = {this.store}>
          <View style = {styles.container_default}>
            <MainNavigator />
            {/* <LoginScreen/> */}
            {/* <WelcomeScreen/> */}
          </View>
        </Provider>
      );
  }
}
