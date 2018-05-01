import React, { Component } from "react";
import { Text, View, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styles from "../stylesheet/Home";
import * as firebase from 'firebase';

class Home extends Component {
  static navigationOptions = {
    title: 'Map',
    header: null
  }

  constructor() {
    super()
    this.state = {
      data: [],
      title: '',
      latitude: 0,
      longitude: 0, 
      rate: 0,
    }
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

  render() {
    return (
      <MapView
        style = {{flex: 1}}
        initialRegion = {{
          latitude: 13.7563,
          longitude: 100.51,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {this.state.data.map(function(item) {
          return(
            <MapView.Marker
              title = {`${item.title}`}
              // description = {`${item.latitude}, ${item.longitude}`}
              description = {`Rate: ${item.rate}/5`}
              coordinate = {{
                latitude: item.latitude,
                longitude: item.longitude
              }}>
            </MapView.Marker>
          )
        })}
      </MapView>
    );  
  }
}
export default Home;