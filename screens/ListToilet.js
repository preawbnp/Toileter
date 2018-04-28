import React, { Component } from 'react';
import { Text, View, ListView, TouchableHighlight } from 'react-native';
import styles from '../stylesheet/ListToilet';
import Toolbar from './components/Toolbar';

class ListToilet extends Component { 
    static navigationOptions = {
        title: 'Toilets',
        header: null
    }

    constructor() {
        super();
        let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            itemDataSource: ds
        }
        this.renderRow = this.renderRow.bind(this);
        this.pressRow = this.pressRow.bind(this);
    }

    componentWillMount() {
        this.getItems();
    }

    getItems() {
        let items = [{title: 'Item #1'}, {title: 'Item #2'}]
        this.setState({
            itemDataSource: this.state.itemDataSource.cloneWithRows(items)
        });
    }

    pressRow(item) {
        console.log(item);
    }

    renderRow(item) {
        return (
            <TouchableHighlight onPress={() => {
                this.pressRow(item)
            }}>
                <View style={styles.li}>
                    <Text style={styles.liText}>{item.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar 
                    title="TOILET LIST"
                />
                <ListView
                    dataSource = {this.state.itemDataSource}
                    renderRow = {this.renderRow}
                />
            </View>
        );
    }
}
export default ListToilet;