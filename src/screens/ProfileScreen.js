import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Header, Card, Button, Avatar } from "react-native-elements";
import { MaterialIcons } from '@expo/vector-icons';
import ImagePicker from 'react-native-image-picker';

import { AuthContext } from '../providers/AuthProvider';
import { removeData } from '../functions/AsyncStorageFunctions';

const ProfileScreen = (props) => {
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
          <View style={styles.contentViewStyle}>
            <Image source={require('../../assets/ehsan.jpg')} style={styles.photoStyle} />
            {/* <Avatar
              source={require('../../assets/ehsan.jpg')}
              rounded
              containerStyle={{ height: 250, width: 250 }}
              size='xlarge'

            /> */}

            {/* {photo && (
              <Image
                source={{ uri: photo.uri }}
                style={styles.photoStyle}
              />
            )} */}
            <Card containerStyle={styles.cardStyle}>
              <Text style={styles.nameTextStyle}>NAME: {auth.currentUser.name}</Text>
              <Card.Divider />
              <Text style={styles.textStyle}>Born on: 15 Dec, 1999</Text>
              <Card.Divider />
              <Text style={styles.textStyle}>Address: Dhaka</Text>
              <Card.Divider />
              <Text style={styles.textStyle}>Works At: InnovaTech</Text>
            </Card>
            <View>
            {/* <Button
                icon={<MaterialIcons name="delete" size={24} color="white" />}
                title="  Image Picker"
                titleStyle={{ color: "white" }}
                buttonStyle={styles.outlineButtonStyle}
                type='outline'
                onPress={ function () {
                  props.navigation.navigate("ImagePicker");
                }
                }
              /> */}
              <Button
                icon={<MaterialIcons name="delete" size={24} color="white" />}
                title="  Delete Profile"
                titleStyle={{ color: "white" }}
                buttonStyle={styles.outlineButtonStyle}
                type='outline'
                onPress={async function () {
                  await removeData(auth.currentUser.email);
                  alert("Profile Deleted Sucessfully!");
                  auth.setIsLoggedIn(false);
                  auth.setCurrentUser({});
                }
                }
              />
              {/* <Button
                icon={<MaterialIcons name="delete" size={24} color="white" />}
                title="Choose Photo"
                titleStyle={{ color: "white" }}
                buttonStyle={styles.outlineButtonStyle}
                type='outline'
                onPress={this.handleChoosePhoto}
              /> */}
            </View>
          </View>
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

export default ProfileScreen;