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
import * as firebase from 'firebase';
import Loading from './../components/Loading';
import "firebase/firestore";

const PostScreen = (props) => {
  //console.log(props.route.params.postID);
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadComments = async () => {
    setIsLoading(true);
    firebase
      .firestore()
      .collection('posts')
      .doc(props.route.params.postID)
      .onSnapshot((querySnapShot) => {
        setIsLoading(false);
        
        setCommentList(querySnapShot.data().comments);
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error);
      })
  }

  useEffect(() => {
    loadComments();
  }, [])
  
  if (isLoading) {
    return <Loading />;
  } else {
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
                  onPress={function () {
                    setIsLoading(true);
                    firebase
                      .firestore()
                      .collection('posts')
                      .doc(props.route.params.postID)
                      .set(
                        {
                          notifications: [{
                            type: "comment",
                            notification_from: auth.currentUser.displayName,
                            notified_at: firebase.firestore.Timestamp.now().toString(),
                            notifying_date: moment().format("DD MMM, YYYY"),
                          }]
                        },
                        { merge: true }
                      )
                      .then(() => {
                        setIsLoading(false);
                      })
                      .catch((error) => {
                        setIsLoading(false);
                        alert(error);
                      })

                    firebase
                      .firestore()
                      .collection('posts')
                      .doc(props.route.params.postID)
                      .set(
                        {
                          comments: [{
                            comment: newComment,
                            commented_by: auth.currentUser.displayName,
                            commented_at: firebase.firestore.Timestamp.now().toString(),
                            commenting_date: moment().format("DD MMM, YYYY")
                          }]
                        },
                        { merge: true }
                      )
                      .then(() => {
                        setIsLoading(false);
                      })
                      .catch((error) => {
                        setIsLoading(false);
                        alert(error);
                      })
                  }
                    //   async () => {
                    //   let arr = [
                    //     ...commentList,
                    //     {
                    //       name: auth.currentUser.name,
                    //       email: auth.currentUser.email,
                    //       date: moment().format("DD MMM, YYYY"),
                    //       comment: newComment,
                    //       key: newComment,
                    //     },
                    //   ];
                    //   if (auth.currentUser.email != props.route.params.email) {
                    //     let arr1 = [
                    //       ...notificationList,
                    //       {
                    //         name: auth.currentUser.name,
                    //         email: auth.currentUser.email,
                    //         date: moment().format("DD MMM, YYYY"),
                    //         post: props.route.params.post,
                    //         notification: auth.currentUser.name.concat(" commented on your post"),
                    //         key: newComment,
                    //         type: "comment",
                    //       }
                    //     ];
                    //     await storeDataJSON(props.route.params.email.concat("notifications"), arr1).then(() => {
                    //       setNotificationList(arr1);
                    //     });
                    //   }

                    //   await storeDataJSON(props.route.params.post, arr).then(() => {
                    //     setCommentList(arr);
                    //   });

                    // }
                  }
                />
              </Card>
            </View>
            <FlatList
              data={commentList}
              renderItem={commentItem => (
                <Comments
                  name={commentItem.item.commented_by}
                  date={commentItem.item.commenting_date}
                  comment={commentItem.item.comment}
                />
              )}
            />
          </View>
        )}
      </AuthContext.Consumer>
    );
  }
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