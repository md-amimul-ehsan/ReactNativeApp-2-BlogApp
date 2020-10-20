import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
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
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [post, setPost] = useState("");
  const getData = async () => {
    let postData = await getDataJSON('posts');
    if (postData.post != null) {
      setPost(postData.post);
      setName(postData.name);
      setDate(postData.date);
    }
  }
  getData();
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
                let newPost = {
                  name: auth.currentUser.name,
                  email: auth.currentUser.email,
                  post: newPostText,
                  date: moment().format("DD MMM, YYYY"),
                };
                storeDataJSON('posts', newPost);
                //alert("Post Successful!");
                setNewPostText("");
              }}
            />
          </Card>
          <PostCard name={name} date={date} post={post} />
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
    width: '95%',
    alignSelf: 'center',
  },

  inputStyle: {
    borderBottomColor: 'white',
  },
});

export default HomeScreen;
