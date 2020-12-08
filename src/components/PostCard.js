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
    const [isLoading, setIsLoading] = useState(false);

    const loadComments = async () => {
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
    
      useEffect(() => {
        loadComments();
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
                                            .collection('posts')
                                            .doc(props.postID)
                                            .set(
                                                {
                                                    notifications: [{
                                                        type: "like",
                                                        notification_from: auth.currentUser.displayName,
                                                        notified_at: firebase.firestore.Timestamp.now().toString(),
                                                        notifying_date: moment().format("DD MMM, YYYY"),
                                                    }],
                                                    likes: likes+1,
                                                },
                                                { merge: true }
                                            )
                                            // .update({
                                            //     notifications: firebase.firestore.FieldValue.arrayUnion(
                                            //         [{
                                            //             type: "like",
                                            //             notification_from: auth.currentUser.displayName,
                                            //             notified_at: firebase.firestore.Timestamp.now().toString()
                                            //         }]
                                            //     )
                                            // })
                                            .then(() => {
                                                setIsLoading(false);
                                            })
                                            .catch((error) => {
                                                setIsLoading(false);
                                                alert(error);
                                            })
                                    }
                                        //    async () => {
                                        //     let numberOfLikes = likes + 1;
                                        //     await storeDataJSON(props.post.concat("likes"), numberOfLikes).then(() => {
                                        //         setLikes(numberOfLikes);
                                        //     });

                                        //     if (auth.currentUser.email != props.email) {
                                        //         let arr2 = [
                                        //             ...notificationList,
                                        //             {
                                        //                 name: props.name,
                                        //                 email: props.email,
                                        //                 date: moment().format("DD MMM, YYYY"),
                                        //                 post: props.post,
                                        //                 notification: auth.currentUser.name.concat(" liked your post"),
                                        //                 key: likes,
                                        //                 type: "like",
                                        //             },
                                        //         ];


                                        //         await storeDataJSON(props.email.concat("notifications"), arr2).then(() => {
                                        //             setNotificationList(arr2);
                                        //         });

                                        //     }



                                        // }
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
                                            navigation.navigate("Post", { name: props.name, post: props.post, date: props.date, email: props.email, postID: props.postID });
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