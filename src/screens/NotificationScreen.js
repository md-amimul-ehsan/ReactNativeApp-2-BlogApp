import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, Button, FlatList } from 'react-native';
import { Text, Header, Input, Card } from "react-native-elements";
import NotificationCard from '../components/NotificationCard';
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
      <Card containerStyle={styles.cardStyle}>
        <FlatList
          data={notificationList}
          renderItem={notificationItem => (
            <View style={{ alignItems: "center" }}>
              <NotificationCard
                name={notificationItem.item.name}
                email={notificationItem.item.email}
                date={notificationItem.item.date}
                post={notificationItem.item.post}
                notification={notificationItem.item.notification}
                type={notificationItem.item.type}
              />
              <Card.Divider />
            </View>
          )}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rootViewStyle: {
    flex: 1,
    backgroundColor: '#17223B',
    alignItems: 'center'
  },
  cardStyle: {
    backgroundColor: '#17223B',
    flex: 1,
    alignItems: "center",
    borderColor: '#17223B',

  },
});

export default NotificationScreen;
