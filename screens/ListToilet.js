import React, { Component } from 'react';
import { Text, View, FlatList, TouchableHighlight } from 'react-native';
import { List, ListItem } from "react-native-elements"
import styles from '../stylesheet/ListToilet';
import Toolbar from './components/Toolbar';
import * as firebase from 'firebase';

class ListToilet extends Component { 
    static navigationOptions = {
        title: 'Toilets',
        header: null
    }

    constructor(props){
        super(props);
    
        this.state = {
          data: [],
        };

        this.itemsRef = this.getRef().child('toilets');
    }

    getRef(){
        return firebase.database().ref();
    }
    
    componentDidMount(){
        this.getItems(this.itemsRef);
    }

    getItems(itemsRef){
        itemsRef.on('value', (data) => {
                let items = [];
                data.forEach((child) => {
                    items.push({
                        title: child.val().title,
                        latitude: child.val().latitude,
                        longitude: child.val().longitude,
                        _key: child.key
                    });
                });
    
                console.log(items);
                this.setState({
                    data: items
                });
            })
        }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar 
                    title="TOILET LIST"
                />
                <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
                    <FlatList
                    data = {this.state.data}
                    renderItem={
                        ({item}) => (
                        <ListItem
                            title={`${item.title}`}
                            subtitle={`${item.latitude}, ${item.longitude}`}
                            containerStyle={{borderBottomWidth:0}}
                        />
                        )}
                        keyExtractor={item => item._key}
                    />
                </List>
            </View>
        );
    }
}
export default ListToilet;