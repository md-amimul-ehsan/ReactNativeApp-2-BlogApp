import React, { Component, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Header } from "react-native-elements";
import { getDataJSON, storeDataJSON } from "../functions/AsyncStorageFunctions";

const NotificationScreen = (props) => {
  // const [notificationList, setNotificationList] = useState([]);
  // const getData = async () => {
  //   setNotificationList(await getDataJSON());
  // }
  // getData();
  //console.log(props);
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
