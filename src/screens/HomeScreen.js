import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Card,
  Button,
  Input,
  Header,
} from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import * as firebase from 'firebase';
import "firebase/firestore";
import Loading from './../components/Loading';
import moment from "moment";
import PostCard from '../components/PostCard';
import { AuthContext } from "../providers/AuthProvider";


const HomeScreen = (props) => {
  const [newPostText, setNewPostText] = useState("");
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPosts = async () => {
    setIsLoading(true);
    firebase
      .firestore()
      .collection('posts')
      .orderBy('created_at', 'desc')
      .onSnapshot((querySnapShot) => {
        setIsLoading(false);
        let posts = [];
        querySnapShot.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPostList(posts);
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error);
      })
  }

  useEffect(() => {
    loadPosts();
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
                color: "white",
                onPress: function () {
                  props.navigation.toggleDrawer();
                }
              }}
            />
            <Card containerStyle={styles.writePostCardStyle}>
              <Input
                placeholder="What's on your mind?"
                style={{ color: 'white' }}
                inputContainerStyle={styles.inputStyle}
                leftIcon={<Entypo name="pencil" size={24} color="white" />}
                onChangeText={function (currentInput) {
                  setNewPostText(currentInput);
                }}
              />
              <Button
                buttonStyle={styles.postButtonStyle}
                titleStyle={{ color: 'white' }}
                title="Post"
                type="outline"
                onPress={function () {
                  setIsLoading(true);
                  firebase
                    .firestore()
                    .collection('posts')
                    .add({
                      userID: auth.currentUser.uid,
                      author: auth.currentUser.displayName,
                      body: newPostText,
                      created_at: firebase.firestore.Timestamp.now(),
                      creating_date: moment().format("DD MMM, YYYY"),
                      comments: [],
                      likes_from: [],
                    })
                    .then(() => {
                      setIsLoading(false);
                      //alert('Post created successfully!');
                    })
                    .catch((error) => {
                      setIsLoading(false);
                      alert(error);
                    })
                }}
              />
            </Card>
            <FlatList
                data={postList}
                renderItem={postItem => (
                  <PostCard
                    author={postItem.item.data.author}
                    date={postItem.item.data.creating_date}
                    post={postItem.item.data.body}
                    authorID={postItem.item.data.userID}
                    postID={postItem.item.id}
                    userID={auth.currentUser.uid}
                  />
                )}
              />

          </View>
        )}
      </AuthContext.Consumer>
    )
  }
}


const styles = StyleSheet.create({
  rootViewStyle: {
    flex: 1,
    backgroundColor: '#17223B',
  },
  writePostCardStyle: {
    backgroundColor: '#17223B',
    borderColor: '#17223B',
  },
  postButtonStyle: {
    borderColor: 'white',
    borderWidth: 1,
    width: '94%',
    alignSelf: 'center',
  },

  inputStyle: {
    borderBottomColor: 'white',
  },
});

export default HomeScreen;
