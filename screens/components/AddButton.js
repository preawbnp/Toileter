import React, { Component } from 'react';
import { AppRegistry, Text, View, StatusBar, TouchableHighlight } from 'react-native';
import styles from '../../stylesheet/component/AddButton';

export default class Toolbar extends Component {
    render() {
        return (
            <View style={styles.action}>
                <TouchableHighlight
                    underlayColor = "#59C162"
                    onPress = {this.props.onPress}
                >
                    <Text style={styles.actionText}>{this.props.title}</Text>
                </TouchableHighlight>
            </View>
        )
    }
}