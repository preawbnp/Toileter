import React, { Component } from 'react';
import { Text, View, FlatList, TouchableHighlight, Modal, TextInput } from 'react-native';
import { List, ListItem, Card } from "react-native-elements"
import styles from '../stylesheet/ListToilet';
import Toolbar from './components/Toolbar';
import AddButton from './components/AddButton';
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
          modalVisible: false,
          title: '',
          latitude: 0,
          longitude: 0, 
          rate: 0,
        };

        this.itemsRef = this.getRef().child('toilets');
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
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
                    rate: child.val().rate,
                    _key: child.key
                });
            });
    
            console.log(items);
            this.setState({
                data: items
            });
        })
    }

    addItem() {
        this.setModalVisible(true);
    }

    render() {
        return (
            <View style = {styles.container}>               
                <Toolbar 
                    title = "TOILET LIST"
                />

                <List containerStyle = {styles.containerStyle}>
                    <FlatList
                    data = {this.state.data}
                    renderItem = {
                        ({item}) => (
                        <ListItem
                            title = {`${item.title}`}
                            titleStyle = {styles.titleStyle}
                            subtitle = {`${item.latitude}, ${item.longitude}`}
                            subtitleStyle = {styles.subtitleStyle}
                            containerStyle = {styles.containerStyle}
                            badge={{ value: item.rate, textStyle: { color: 'white', fontSize: 14 }, containerStyle: { margin: 10, backgroundColor: '#F4CA37' } }}
                        />
                        )}
                        keyExtractor = {item => item._key}
                    />
                </List>
                
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {}}
                >

                <View style={{marginTop: 25}}>
                    <View>
                        <Toolbar title="ADD ITEM"/>
                        
                        <View style={styles.input_group}>
                            {/* Input data */}
                            <TextInput
                                style = {styles.input}
                                value = {this.state.title}
                                placeholder="Enter place name"
                                onChangeText = {(value) => this.setState({title: value})}
                            />
                            <TextInput
                                style = {styles.input}
                                value = {this.state.latitude}
                                placeholder="Enter latitude"
                                keyboardType={'numeric'}
                                onChangeText = {(value) => this.setState({latitude: value})}
                            />
                            <TextInput
                                style = {styles.input}
                                value = {this.state.longitude}
                                placeholder="Enter longitude"
                                keyboardType={'numeric'}
                                onChangeText = {(value) => this.setState({longitude: value})}
                            />
                            <TextInput
                                style = {styles.input}
                                value = {this.state.rate}
                                placeholder="Enter rate 1(dirty) to 5(exllent)"
                                keyboardType={'numeric'}
                                onChangeText = {(value) => this.setState({rate: value})}
                            />
                        </View>

                        {/* Button */}
                        <View style={styles.btn_group}>
                        <TouchableHighlight
                            onPress={() => {
                                this.itemsRef.push({
                                    title: this.state.title, 
                                    latitude: this.state.latitude, 
                                    longitude: this.state.longitude, 
                                    rate: this.state.rate
                                });
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <View style={styles.save_btn}>
                                <Text style={styles.btn_text}>Save</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            onPress={() => {
                                this.setState({title: '', latitude: '', longitude: '', rate: ''})
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <View style={styles.cancel_btn}>
                                <Text style={styles.btn_text}>Cancel</Text>
                            </View>
                        </TouchableHighlight>
                        </View>
                    </View>
                </View>
                </Modal>

                <AddButton onPress={this.addItem.bind(this)} title = "Add Item"/>
            </View>
        );
    }
}
export default ListToilet;