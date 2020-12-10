import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Card,
    Button,
    Avatar,
    Text,
} from "react-native-elements";
import { AntDesign, FontAwesome5, Octicons } from "@expo/vector-icons";
import moment from "moment";
import { useNavigation } from '@react-navigation/native';
import { removeData } from '../functions/AsyncStorageFunctions';
import { getDataJSON, storeDataJSON } from "../functions/AsyncStorageFunctions";
import { AuthContext } from '../providers/AuthProvider';
import * as firebase from 'firebase';
import Loading from './Loading';
import "firebase/firestore";

const PostCard = (props) => {
    //console.log(props);
    const [likes, setLikes] = useState(0);
    const [commentList, setCommentList] = useState([]);
    const [notificationList, setNotificationList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const LoadCommentAndLikeData = async () => {
        setIsLoading(true);
        firebase
            .firestore()
            .collection('posts')
            .doc(props.postID)
            .onSnapshot((querySnapShot) => {
                setIsLoading(false);
                setLikes(querySnapShot.data().likes);
                setCommentList(querySnapShot.data().comments);
            })
            .catch((error) => {
                setIsLoading(false);
                alert(error);
            })
    }

    const LoadNotificationData = async () => {
        setIsLoading(true);
        firebase
            .firestore()
            .collection('users')
            .doc(props.authorID)
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
        LoadCommentAndLikeData();
        LoadNotificationData();
    }, [])

    let commentButtonTitle = "  Comment (20)";
    commentButtonTitle = " Comment (".concat(commentList.length.toString()).concat(")");
    let likeButtonTitle = "  Like (11)";
    likeButtonTitle = " Like (".concat(likes.toString()).concat(")");
    const navigation = useNavigation();

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <AuthContext.Consumer>
                {(auth) => (
                    <View style={styles.rootViewStyle}>
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
                                    {props.name}
                                </Text>
                                <Button
                                    icon={<Octicons name="trashcan" size={24} color="white" />}
                                    buttonStyle={{ backgroundColor: '#6B778D' }}
                                    type='solid'
                                    onPress={function () {
                                        firebase
                                            .firestore()
                                            .collection('posts')
                                            .doc(props.postID)
                                            .delete()
                                            .then(() => {
                                                alert('post deleted successfully');
                                            })
                                            .catch((error) => {
                                                alert(error);
                                            })
                                    }}
                                />
                            </View>
                            <Text style={{ fontStyle: "italic", color: "white" }}> Posted on {props.date}</Text>
                            <Text
                                style={{
                                    paddingVertical: 10,
                                    color: "white"
                                }}
                            >
                                {props.post}
                            </Text>
                            <Card.Divider />
                            <View
                                style={{ flexDirection: "row", justifyContent: "space-between" }}
                            >
                                <Button
                                    type="outline"
                                    title={likeButtonTitle}
                                    titleStyle={{ color: 'white' }}
                                    buttonStyle={{ borderColor: 'white', borderWidth: 1, borderRadius: 10 }}
                                    icon={<AntDesign name="like2" size={24} color="white" />}
                                    onPress={function () {
                                        setIsLoading(true);
                                        firebase
                                            .firestore()
                                            .collection('users')
                                            .doc(props.authorID)
                                            .set(
                                                {
                                                    notifications: [
                                                        ...notificationList,
                                                        {
                                                            type: "like",
                                                            notification_from: auth.currentUser.displayName,
                                                            notified_at: firebase.firestore.Timestamp.now().toString(),
                                                            notifying_date: moment().format("DD MMM, YYYY"),
                                                            posting_date: props.date,
                                                            postID: props.postID,
                                                            authorID: props.authorID,
                                                            post: props.post,
                                                            author: props.author,
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

                                        setIsLoading(true);
                                        firebase
                                            .firestore()
                                            .collection('posts')
                                            .doc(props.postID)
                                            .set(
                                                {
                                                    likes: likes + 1
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
                                    }
                                />
                                <Button
                                    type="solid"
                                    title={commentButtonTitle}
                                    titleStyle={{ color: 'white', }}
                                    buttonStyle={{ backgroundColor: '#17223B', borderRadius: 10 }}
                                    icon={<FontAwesome5 name="comment" size={24} color="white" />}
                                    onPress={
                                        function () {
                                            navigation.navigate("Post", { author: props.author, post: props.post, date: props.date, authorID: props.authorID, postID: props.postID });
                                        }
                                    }
                                />
                            </View>
                        </Card>
                    </View>
                )}
            </AuthContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: '#6B778D',
        borderColor: '#6B778D',
        borderRadius: 15,
        width: '95%',
    },
    rootViewStyle: {
        flex: 1,
    },
});

export default PostCard;