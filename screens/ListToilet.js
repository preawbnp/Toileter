import React, { Component } from 'react';
import { View, Image, Modal, TextInput, TouchableHighlight } from 'react-native';
import MapView from "react-native-maps";
import styles from '../stylesheet/ListToilet';
import Toolbar from './components/Toolbar';
import AddButton from './components/AddButton';
import * as firebase from 'firebase';
import { Container, Header, Content, Card, CardItem, Thumbnail, 
    Text, Button, Icon, Left, Body, Right, List, ListItem, Title } from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import { Rating } from 'react-native-elements';
import { ImagePicker, Permissions, Constants } from 'expo';

class ListToilet extends Component { 
    static navigationOptions = {
        title: 'Toilets',
        header: null,
        tabBarIcon: ({focused}) => (
            <Ionicons
                name={focused ? 'ios-list' : 'ios-list-outline'}
                size={26}
                style={{ color: focused ? '#33A3F4' : '#949494', marginTop: 10}}
            />
          ),
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
          userLongitude: 0,          
          isDisabled: '',
          isFee: '',
          isSprayHose: '',
        };

        this.itemsRef = this.getRef().child('toilets');
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    getRef(){
        return firebase.database().ref();
    }
    
    getStorage(){
        return firebase.storage().ref();
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
                    isDisabled: child.val().isDisabled,
                    isFee: child.val().isFee,
                    isSprayHose: child.val().isSprayHose,
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

    onChooseImagePress = async () => {
        this.setModalVisible(false);
        let result = await ImagePicker.launchImageLibraryAsync();
        
        if(!result.cancelled) {
            this.setState({ image: result.uri })
            this.uploadImage( this.state.image, this.state.title );
            
            this.setModalVisible(true);
        }
    }

    uploadImage = async(uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        var ref = this.getStorage().child("toilet-images/" + imageName)
        return ref.put(blob);
    }

    render() {
        return (
            <Container>               
                <Header style={{color: '#444444'}}>
                    <Title style={{marginTop: 10, fontSize: 20}}>TOILETER</Title>
                </Header>
            
                <Content style={{backgroundColor: '#ffffff'}}>
                    
                    <List dataArray = { this.state.data }
                        renderRow = { (item) =>
                            <ListItem>
                                <Card>
                                    <CardItem header style={{height: 50}}>
                                        <Left>
                                            <Text style={styles.titleStyle}>{`${item.title}`}</Text>
                                        </Left>
                                        <Right>
                                            <Button transparent danger 
                                                onPress={() => {
                                                    this.itemsRef.child(item._key).remove()
                                                    alert("Removed!");
                                                    }
                                                }>
                                                <Icon active name='close'/>
                                            </Button>
                                        </Right>
                                    </CardItem>
                                    <CardItem>
                                        <Image source={{uri: item.image}} style={{height: 200, width: null, flex: 1}}/>    
                                    </CardItem>

                                    <CardItem style={styles.detailAlign}>
                                        <Rating
                                            type="star"
                                            ratingCount={5}
                                            startingValue={`${item.rate}`}
                                            imageSize={20}
                                            onFinishRating={this.ratingCompleted}
                                        />
                                    </CardItem>

                                    <CardItem style={styles.detailAlign}>
                                        <Text style={styles.detailText}>{`latitude: ${item.latitude}, longitude: ${item.longitude}`}</Text>
                                    </CardItem>

                                    <CardItem style={styles.functionAlign}>
                                        <Button iconLeft transparent primary>
                                            <Icon active name='logo-usd'/>
                                            <Text style={styles.detailText}>{`${item.isFee}`}</Text>
                                        </Button>
                                        <Button iconLeft transparent primary>
                                            <Icon active name='eye-off'/>
                                            <Text style={styles.detailText}>{`${item.isDisabled}`}</Text>
                                        </Button>
                                        <Button iconLeft transparent primary>
                                            <Icon active name='water'/>
                                            <Text style={styles.detailText}>{`${item.isSprayHose}`}</Text>
                                        </Button>
                                    </CardItem>

                                </Card>
                            </ListItem>
                        }>
                    </List>

                <Modal
                    animationType="none" //slide
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {}}
                >

                <View style={{marginTop: 25}}>
                    <View>
                        <Toolbar title="ADD ITEM"/>

                        <View style={styles.input_group}>

                        <TouchableHighlight
                            onPress={this.onChooseImagePress}>
                            <View style={styles.image_btn}>
                                <Text style={styles.btn_text}>Libary</Text>
                            </View>
                        </TouchableHighlight>

                        <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 0, marginTop: 20}}>
                            <Text style={styles.textModalImageStyle}>{this.state.image}</Text>
                        </View>

                        <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 20}}>
                            

                                <Text style={styles.textModalStyle}>Your location</Text>
                                <Text style={styles.textModalLocationStyle}>( {this.state.userLatitude}, {this.state.userLongitude} )</Text>
                                <Text style={styles.textModalReviewStyle}>latitude, longitude</Text>
                                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                            </View>
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
                                placeholder="Enter rate 1(Dirty) to 5(Excellent)"
                                keyboardType={'numeric'}
                                onChangeText = {(value) => this.setState({rate: value})}
                            />

                            <TextInput
                                style = {styles.input}
                                value = {this.state.isDisabled}
                                placeholder="Have a disabled? : True or False"
                                onChangeText = {(value) => this.setState({isDisabled: value})}
                           />

                            <TextInput
                                style = {styles.input}
                                value = {this.state.isSprayHose}
                                placeholder="Have a spray hose? : True or False"
                                onChangeText = {(value) => this.setState({isSprayHose: value})}
                            />

                            <TextInput
                                style = {styles.input}
                                value = {this.state.isFee}
                                placeholder="Have to pay to use? : True or False"
                                onChangeText = {(value) => this.setState({isFee: value})}
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
                                    rate: this.state.rate,
                                    isDisabled: this.state.isDisabled,
                                    isFee: this.state.isFee,
                                    isSprayHose: this.state.isSprayHose,
                                    image: this.state.image,
                                });
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <View style={styles.save_btn}>
                                <Text style={styles.btn_text}>Save</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            onPress={() => {
                                this.setState({title: '', latitude: '', longitude: '', 
                                rate: '', isDisabled: '', isFee: '', isSprayHose: ''})
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

                </Content>
                <AddButton onPress={this.addItem.bind(this)} title = "Add Item"/>

            </Container>
        );
    }
}
export default ListToilet;