import React, { Component } from 'react';
import { AppRegistry, Text, View, StatusBar, Button } from 'react-native';
import styles from '../../stylesheet/component/Toolbar';
// const styles = require('../../stylesheet/Toolbar');

export default class Toolbar extends Component {
    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor = "coral"
                    barStyle = "light-content"
                />
                <View style={styles.navbar}>
                    <Text style={styles.navbarTitle}>
                        {this.props.title}
                    </Text>
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('Toolbar', () => Toolbar);