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
  const [userID, setUserID] = useState("b");
  const [notificationList, setNotificationList] = useState([]);
  const getUserData = async () => {
    await getDataJSON("user").then((data) => {
      if (data == null) {
        setUserID("");
      } else setUserID(data);
    });
  };
  const LoadNotificationData = async () => {
    setIsLoading(true);
    firebase
      .firestore()
      .collection('users')
      .doc(userID)
      .onSnapshot((querySnapShot) => {
        setIsLoading(false);
        setNotificationList(querySnapShot.data().notifications);
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error);
      })
  }

  useEffect(() => {
    getUserData();
  }, [])

  useEffect(() => {
    LoadNotificationData();
  }, [])

  

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
                author={notificationItem.item.author}
                notification_from={notificationItem.item.notification_from}
                date={notificationItem.item.posting_date}
                post={notificationItem.item.post}
                notification={notificationItem.item.notification}
                type={notificationItem.item.type}
                postID={notificationItem.item.postID}
                authorID={notificationItem.item.authorID}
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
