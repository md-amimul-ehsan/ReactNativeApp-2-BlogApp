import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, Button, FlatList } from 'react-native';
import { Text, Header, Input } from "react-native-elements";
import { getDataJSON, storeDataJSON, removeData } from "../functions/AsyncStorageFunctions";
import { AuthContext } from '../providers/AuthProvider';

const NotificationScreen = (props) => {
  // const [notificationList, setNotificationList] = useState([]);
  // const getData = async () => {
  //   setNotificationList(await getDataJSON());
  // }
  // getData();
  //console.log(props);
  const [email, setEmail] = useState("");
  const [notificationList, setNotificationList] = useState([]);
  const getUserData = async () => {
    await getDataJSON("user").then((data) => {
      if (data == null) {
        setEmail("");
      } else setEmail(data);
    });
  };
  const getData = async () => {
    await getDataJSON(email.concat("notifications")).then((data) => {
      if (data == null) {
        setNotificationList([]);
      } else setNotificationList(data);
    });
  };
  const init = async () => {
    await removeData(email.concat("notifications"));
  };
  useEffect(() => {
    getUserData();
    //getData();
    //getData();
  }, [])
  //console.log(email);
  useEffect(() => {
    getData();
    //init();
  }, [notificationList])
  //console.log(notificationList);

  return (
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
      {/* <Text style={{ color: 'white' }}>sup?</Text> */}
      <FlatList
        keyExtractor={(item, index) => item.key}
        data={notificationList}
        renderItem={notificationItem => (
          <Text style={{ color: 'white' }}> {notificationItem.item.notification} </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootViewStyle: {
    flex: 1,
    backgroundColor: '#17223B',
    alignItems: 'center'
  },
});

export default NotificationScreen;
