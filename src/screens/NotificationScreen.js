import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Header } from "react-native-elements";

const NotificationScreen = (props) => {
    return (
      <View style={styles.rootViewStyle}>
        <Header
            backgroundColor='#6B778D'
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              }
            }}
          />
        <Text> Notification </Text>
      </View>
    );
}

const styles = StyleSheet.create({
  rootViewStyle: {
    flex: 1,
    backgroundColor: '#17223B',
  },
});

export default NotificationScreen;
