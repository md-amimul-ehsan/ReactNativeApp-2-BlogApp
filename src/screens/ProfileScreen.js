import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Header, Card } from "react-native-elements";

import { AuthContext } from '../providers/AuthProvider';

const ProfileScreen = (props) => {
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
              }
            }}
          />
          <View style={styles.contentViewStyle}>
            <Image source={require('../../assets/ehsan.jpg')} style={styles.photoStyle} />
            <Card containerStyle={styles.cardStyle}>
              <Text style={styles.nameTextStyle}>NAME: {auth.currentUser.name}</Text>
              <Card.Divider/>
              <Text style={styles.textStyle}>Born on: 15 Dec, 1999</Text>
              <Card.Divider/>
              <Text style={styles.textStyle}>Address: Dhaka</Text>
              <Card.Divider/>
              <Text style={styles.textStyle}>Works At: InnovaTech</Text>
            </Card>
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
    flex:1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
});

export default ProfileScreen;
