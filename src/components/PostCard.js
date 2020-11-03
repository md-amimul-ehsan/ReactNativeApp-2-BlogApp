import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Card,
    Button,
    Avatar,
    Text,
} from "react-native-elements";
import { AntDesign, FontAwesome5, Octicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { removeData } from '../functions/AsyncStorageFunctions';
import { getDataJSON, storeDataJSON } from "../functions/AsyncStorageFunctions";

const PostCard = (props) => {
    const [commentList, setCommentList] = useState([]);
    const [likes, setLikes] = useState(0);
    const [data, setData] = useState({});
    const getData = async () => {
        await getDataJSON(props.post).then((data) => {
            if (data == null) {
                setCommentList([]);
            } else setCommentList(data);
        });
    };
    getData();

    let commentButtonTitle = "  comment (0)";
    commentButtonTitle = "  Comment (".concat(commentList.length.toString()).concat(")");

    let likeButtonTitle = "";
    if (likes != 0) {
        likeButtonTitle = "  Like (".concat(likes.toString()).concat(")");
    }
    else {
        likeButtonTitle = " Like (0)";
    }
    const navigation = useNavigation();

    return (
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
                        onPress={async function () {
                            await removeData('posts');
                            alert("Post Deleted Sucessfully!");
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
                    // onPress={
                    //     async () => {
                    //         setLikes(likes + 1);
                    //         let storedObject = {};
                    //         storedObject.commentList = commentList;
                    //         storedObject.likes = likes;
                    //         await storeDataJSON(props.post, storedObject);
                    //     }
                    // }
                    />
                    <Button
                        type="solid"
                        title={commentButtonTitle}
                        titleStyle={{ color: 'white', }}
                        buttonStyle={{ backgroundColor: '#17223B', borderRadius: 10 }}
                        icon={<FontAwesome5 name="comment" size={24} color="white" />}
                        onPress={
                            function () {
                                navigation.navigate("Post", { name: props.name, post: props.post, date: props.date, email: props.email });
                            }
                        }
                    />
                </View>
            </Card>
        </View>
    );
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