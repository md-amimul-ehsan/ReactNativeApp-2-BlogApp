import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Header, Card, Button, Avatar } from "react-native-elements";
import { MaterialIcons } from '@expo/vector-icons';
import ImagePicker from 'react-native-image-picker';

import { AuthContext } from '../providers/AuthProvider';
import { removeData } from '../functions/AsyncStorageFunctions';

const PostScreen = (props) => {
  // state = {
  //   photo: null,
  // };

  // handleChoosePhoto = () => {
  //   const options = {
  //     noData: true,
  //   };
  //   ImagePicker.launchImageLibrary(options, (response) => {
  //     if (response.uri) {
  //       this.setState({ photo: response });
  //     }
  //   });
  // };
  // const { photo } = this.state;
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.rootViewStyle}>
          <Header
            containerStyle={{ borderBottomColor: '#6B778D' }}
            backgroundColor='#6B778D'
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
          />
          <Text style={{color:'white'}}>Post</Text>
        </View>
      )}
    </AuthContext.Consumer>
  );
}

const styles = StyleSheet.create({
  rootViewStyle: {
    flex: 1,
    backgroundColor: '#17223B',
  },
  photoStyle: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
  },
  cardStyle: {
    backgroundColor: '#6B778D',
    borderColor: '#6B778D',
    borderRadius: 50,
    width: '80%',
  },
  nameTextStyle: {
    color: 'white',
    fontSize: 25,
    alignSelf: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
  },
  contentViewStyle: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  outlineButtonStyle: {
    borderColor: "white",
    borderWidth: 1,
    width: '100%',
  },
});

export default PostScreen;