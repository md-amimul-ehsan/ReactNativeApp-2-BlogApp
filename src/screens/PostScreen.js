import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { Text, Header, Card, Button, Avatar, Input } from "react-native-elements";
import { MaterialIcons } from '@expo/vector-icons';
import ImagePicker from 'react-native-image-picker';
import { AntDesign, FontAwesome5, Octicons } from "@expo/vector-icons";
import { AuthContext } from '../providers/AuthProvider';
import { ScrollView } from 'react-native-gesture-handler';
import Comments from "../components/Comments";
import moment from "moment";
import { getDataJSON, storeDataJSON, removeData } from "../functions/AsyncStorageFunctions";

const PostScreen = (props) => {
  //console.log(props);
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  
  const getCommentData = async () => {
    await getDataJSON(props.route.params.post).then((data) => {
      if (data == null) {
        setCommentList([]);
      } else setCommentList(data);
    });
  };
  const getNotificationData = async () => {
    await getDataJSON(props.route.params.email.concat("notifications")).then((data) => {
      if (data == null) {
        setNotificationList([]);
      } else setNotificationList(data);
    });
  };
  const init = async () => {
    await removeData(props.route.params.post);
  };
  useEffect(() => {
    getCommentData();
    getNotificationData();
    //init();
  }, [])
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
          <View style={{ alignItems: 'center' }}>
            <Card containerStyle={styles.cardStyle}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar
                  containerStyle={{ backgroundColor: "#ffab91" }}
                  rounded
                  icon={{ name: "user", type: "font-awesome", color: "black" }}
                  activeOpacity={1}
                />
                <Text h4Style={{ padding: 10, color: 'white' }} h4>
                  {props.route.params.name}
                </Text>

              </View>
              <Text
                style={{ fontStyle: "italic", color: "white" }}> Posted on {props.route.params.date}
              </Text>
              <Text
                style={{
                  paddingVertical: 10,
                  color: "white"
                }}
              >
                {props.route.params.post}
              </Text>
              <Input
                inputContainerStyle={{ borderBottomColor: 'white', marginTop: 30 }}
                placeholder="Write Something!"
                style={{ color: 'white' }}
                onChangeText={function (currentInput) {
                  setNewComment(currentInput);
                }}
              />
              <Button
                buttonStyle={styles.outlineButtonStyle}
                titleStyle={{ color: 'white' }}
                title="  Comment"
                type="outline"
                icon={<FontAwesome5 name="comment" size={24} color="white" />}
                onPress={async () => {
                  let arr = [
                    ...commentList,
                    {
                      name: auth.currentUser.name,
                      email: auth.currentUser.email,
                      date: moment().format("DD MMM, YYYY"),
                      comment: newComment,
                      key: newComment,
                    },
                  ];
                  if (auth.currentUser.email != props.route.params.email) {
                    let arr1 = [
                      ...notificationList,
                      {
                        name: auth.currentUser.name,
                        email: auth.currentUser.email,
                        date: moment().format("DD MMM, YYYY"),
                        post: props.route.params.post,
                        notification: auth.currentUser.name.concat(" commented on your post"),
                        key: newComment,
                        type: "comment",
                      }
                    ];
                    await storeDataJSON(props.route.params.email.concat("notifications"), arr1).then(() => {
                      setNotificationList(arr1);
                    });
                  }

                  await storeDataJSON(props.route.params.post, arr).then(() => {
                    setCommentList(arr);
                  });

                }}
              />
            </Card>
          </View>
          {/* <FlatList
            data={commentList}
            renderItem={commentItem => (
              <Comments
                name={commentItem.item.name}
                date={commentItem.item.date}
                comment={commentItem.item.comment}
              />
            )}
          /> */}
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
  cardStyle: {
    backgroundColor: '#6B778D',
    borderColor: '#6B778D',
    width: '100%',
  },
  outlineButtonStyle: {
    borderColor: "white",
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
  },
});

export default PostScreen;