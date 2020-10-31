import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Card,
  Button,
  Input,
  Header,
} from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";

import PostCard from '../components/PostCard';
import { AuthContext } from "../providers/AuthProvider";
import { getDataJSON, storeDataJSON } from "../functions/AsyncStorageFunctions";


const HomeScreen = (props) => {
  const [newPostText, setNewPostText] = useState("");
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setPostList(await getDataJSON('posts'));
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
              onPress={async() => {
                if (postList != null) {
                  setPostList(posts => [
                    ...posts,
                    {
                      name: auth.currentUser.name,
                      email: auth.currentUser.email,
                      date: moment().format("DD MMM, YYYY"),
                      post: newPostText,
                      key: newPostText,
                    },
                  ]);
                }
                else {
                  const arr = [];
                  arr.push({
                    name: auth.currentUser.name,
                    email: auth.currentUser.email,
                    date: moment().format("DD MMM, YYYY"),
                    post: newPostText,
                    key: newPostText,
                  });
                  setPostList(arr);
                }
                await storeDataJSON('posts', postList);
                //alert("Post Successful!");
                setNewPostText("");
              }}
            />
          </Card>
          {/* {console.log('list ',postList)} */}
          <FlatList
            data={postList}
            renderItem={postItem => (
              <PostCard
                name={postItem.item.name}
                date={postItem.item.date}
                post={postItem.item.post}
              />
            )}
          />

        </View>
      )}
    </AuthContext.Consumer>
  )
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
