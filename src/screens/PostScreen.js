import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { Text, Header, Card, Button, Avatar, Input } from "react-native-elements";
import { MaterialIcons } from '@expo/vector-icons';
import ImagePicker from 'react-native-image-picker';
import { AntDesign, FontAwesome5, Octicons } from "@expo/vector-icons";
import { AuthContext } from '../providers/AuthProvider';
import { removeData } from '../functions/AsyncStorageFunctions';
import { ScrollView } from 'react-native-gesture-handler';
import Comments from "../components/Comments";
import moment from "moment";
import { getDataJSON, storeDataJSON } from "../functions/AsyncStorageFunctions";

const PostScreen = (props) => {
  //console.log(props);
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setCommentList(await getDataJSON(props.route.params.post));
    }
    getData();
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
                  if (commentList != null) {
                    setCommentList(comments => [
                      ...comments,
                      {
                        name: auth.currentUser.name,
                        comment: newComment,
                        key: newComment,
                        date: moment().format("DD/MM/YY"),
                      },
                    ]);
                  }
                  else {
                    const arr = [];
                    arr.push({
                      name: auth.currentUser.name,
                      comment: newComment,
                      key: newComment,
                      date: moment().format("DD/MM/YY"),
                    });
                    setCommentList(arr);
                  }

                  if (auth.currentUser.email != props.route.params.email) {
                    if (notificationList != null) {
                      setNotificationList(notifications => [
                        ...notifications, auth.currentUser.name.concat(" commented on your post")
                      ]);
                    }
                    else {
                      const arr = [];
                      arr.push(auth.currentUser.name.concat(" commented on your post"));
                      setNotificationList(arr);
                    }
                  }

                  await storeDataJSON(props.route.params.name, notificationList);
                  await storeDataJSON(props.route.params.post, commentList);
                  //alert("Post Successful!");
                  setNewComment("");
                }}
              />
            </Card>
          </View>
          <FlatList
            data={commentList}
            renderItem={commentItem => (
              <Comments
                name={commentItem.item.name}
                date={commentItem.item.date}
                comment={commentItem.item.comment}
              />
            )}
          />
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