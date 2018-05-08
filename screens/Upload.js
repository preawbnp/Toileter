// import React, {Component} from 'react';
// import {
//   ActivityIndicator,
//   Button,
//   Clipboard,
//   Image,
//   Share,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Exponent, { Constants, ImagePicker, registerRootComponent, Permissions } from 'expo';

// class Upload extends Component {
//   state = {
//     image: null,
//     uploading: false,
//   };

//   render() {
//     let { image } = this.state;

//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text
//           style={{
//             fontSize: 20,
//             marginBottom: 20,
//             textAlign: 'center',
//             marginHorizontal: 15,
//           }}>
//           Example: Upload ImagePicker result
//         </Text>

//         <Button
//           onPress={this._pickImage}
//           title="Pick an image from camera roll"
//         />

//         <Button onPress={this._takePhoto} title="Take a photo" />

//         {this._maybeRenderImage()}
//         {this._maybeRenderUploadingOverlay()}

//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }

//   _maybeRenderUploadingOverlay = () => {
//     if (this.state.uploading) {
//       return (
//         <View
//           style={[
//             StyleSheet.absoluteFill,
//             {
//               backgroundColor: 'rgba(0,0,0,0.4)',
//               alignItems: 'center',
//               justifyContent: 'center',
//             },
//           ]}>
//           <ActivityIndicator color="#fff" animating size="large" />
//         </View>
//       );
//     }
//   };

//   _maybeRenderImage = () => {
//     let { image } = this.state;
//     if (!image) {
//       return;
//     }

//     return (
//       <View
//         style={{
//           marginTop: 30,
//           width: 250,
//           borderRadius: 3,
//           elevation: 2,
//           shadowColor: 'rgba(0,0,0,1)',
//           shadowOpacity: 0.2,
//           shadowOffset: { width: 4, height: 4 },
//           shadowRadius: 5,
//         }}>
//         <View
//           style={{
//             borderTopRightRadius: 3,
//             borderTopLeftRadius: 3,
//             overflow: 'hidden',
//           }}>
//           <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
//         </View>

//         <Text
//           onPress={this._copyToClipboard}
//           onLongPress={this._share}
//           style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
//           {image}
//         </Text>
//       </View>
//     );
//   };

//   _share = () => {
//     Share.share({
//       message: this.state.image,
//       title: 'Check out this photo',
//       url: this.state.image,
//     });
//   };

//   _copyToClipboard = () => {
//     Clipboard.setString(this.state.image);
//     alert('Copied image URL to clipboard');
//   };

//   _takePhoto = async () => {
//     await this.askPermissionsAsync();
//     let pickerResult = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });

//     this._handleImagePicked(pickerResult);
//   };

//   _pickImage = async () => {
//     await this.askPermissionsAsync();
//     let pickerResult = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });

//     this._handleImagePicked(pickerResult);
//   };

//   _handleImagePicked = async pickerResult => {
//     let uploadResponse, uploadResult;

//     try {
//       this.setState({ uploading: true });

//       if (!pickerResult.cancelled) {
//         await this.askPermissionsAsync();
//         uploadResponse = await uploadImageAsync(pickerResult.uri);
//         uploadResult = await uploadResponse.json();
//         this.setState({ image: uploadResult.location });
//       }
//     } catch (e) {
//       console.log({ uploadResponse });
//       console.log({ uploadResult });
//       console.log({ e });
//       alert('Upload failed, sorry :(');
//     } finally {
//       this.setState({ uploading: false });
//     }
//   };
// }

// askPermissionsAsync = async () => {
//     await Permissions.askAsync(Permissions.CAMERA);
//     await Permissions.askAsync(Permissions.CAMERA_ROLL);
//     // you would probably do something to verify that permissions
//     // are actually granted, but I'm skipping that for brevity
//   };

// async function uploadImageAsync(uri) {
//   let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';

//   // Note:
//   // Uncomment this if you want to experiment with local server
//   //
//   // if (Constants.isDevice) {
//   //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
//   // } else {
//   //   apiUrl = `http://localhost:3000/upload`
//   // }

//   let uriParts = uri.split('.');
//   let fileType = uriParts[uriParts.length - 1];

//   let formData = new FormData();
//   formData.append('photo', {
//     uri,
//     name: `photo.${fileType}`,
//     type: `image/${fileType}`,
//   });

//   let options = {
//     method: 'POST',
//     body: formData,
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//     },
//   };

//   return fetch(apiUrl, options);
// }

// export default Upload;


import React, { Component } from 'react';
import { Button, Text, ScrollView, StyleSheet } from 'react-native';
import { ImagePicker, Permissions, Constants } from 'expo';
import * as firebase from 'firebase';

class Upload extends Component {
  state = {
    image: null,
    url: '',
  };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    let image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      base64: false,
    });
    this.setState({ image });
  };

//   useCameraHandler = async () => {
//     await this.askPermissionsAsync();
//     let image = await ImagePicker.launchCameraAsync({
//       allowsEditing: false,
//       aspect: [4, 3],
//       base64: false,
//     });
//     this.setState({ image });
//   };

  render() {
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        {/* <Button title="Camera" onPress={this.useCameraHandler} /> */}
        <Button
          title="Library"
          onPress={this.useLibraryHandler}
        />
        <Text style={styles.paragraph}>
          {JSON.stringify(this.state.image)}
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
    minHeight: 1000,
  },
  paragraph: {
    marginHorizontal: 15,
    marginTop: 30,
    fontSize: 18,
    color: '#34495e',
  },
});

export default Upload;