import React, { Component } from 'react';
import { TouchableHighlight, 
        Modal, TextInput, View, Image } from 'react-native';
import MapView from "react-native-maps";
import styles from '../stylesheet/ListToilet';
import Toolbar from './components/Toolbar';
import AddButton from './components/AddButton';
import * as firebase from 'firebase';
import { Container, Header, Content, Card, CardItem, Thumbnail, 
    Text, Button, Icon, Left, Body, Right, List, ListItem } from 'native-base';

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
          image: '',
          userLatitude: 0,
          userLongitude: 0
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

        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                userLatitude: position.coords.latitude,
                userLongitude: position.coords.longitude,
                error: null,
              });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
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
                    image: child.val().image,
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
                
                {/* <Card>
                    <CardItem>
                        <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>

                    <CardItem>
                        <Body>
                            <Text>Future Park Rangsit</Text>
                            <Text>Description</Text>
                        </Body>
                        <Right>
                        <Button rounded style={{backgroundColor: '#FF7468'}}>
                            <Icon name="trash"/>
                        </Button>
                        </Right>
                    </CardItem>
                </Card> */}
                    
                        
                <List 
                    data = {this.state.data}
                    renderItem = { (item) => (
                        <ListItem>
                            <Card>
                                <CardItem>
                                    <Image>{{uri: item.image}}</Image>
                                </CardItem>
                            </Card>
                        </ListItem>
                        )}
                        keyExtractor = {item => item._key}
                    >
                </List>
                
                <Modal
                    animationType="slide"
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
                            
                            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Latitude: {this.state.userLatitude}</Text>
                            <Text>Longitude: {this.state.userLongitude}</Text>
                            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                        </View>

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

