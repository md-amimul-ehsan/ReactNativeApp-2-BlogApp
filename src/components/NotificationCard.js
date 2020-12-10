import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Button, Text, Avatar, Input, Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Feather, AntDesign } from '@expo/vector-icons';

const NotificationCard = (props) => {
    //console.log(props);
    let notificationText = "";
    if (props.type == "comment") {
        notificationText = " ";
        notificationText = notificationText.concat(props.notification_from);
        notificationText = notificationText.concat(" commented on your post");
    }
    else {
        notificationText = " ";
        notificationText = notificationText.concat(props.notification_from);
        notificationText = notificationText.concat(" liked your post");
    }
    const useStackNavigation = useNavigation();
    return (

        <View style={{ alignItems: "center" }}>

            { (props.type == "comment") ?
                <Button buttonStyle={styles.buttonStyle}
                    type="clear"
                    icon={<FontAwesome name="comment" size={24} color='white' />}
                    title={notificationText}
                    titleStyle={{ color: 'white' }}
                    onPress={function () {
                        useStackNavigation.navigate("Post", { post: props.post, name: props.name, date: props.date });
                    }}

                /> :
                <Button buttonStyle={styles.buttonStyle}
                    type="clear"
                    icon={<AntDesign name="like1" size={24} color='white' />}
                    title={notificationText}
                    titleStyle={{ color: 'white' }}
                    onPress={function () {
                        useStackNavigation.navigate("Post", { post: props.post, author: props.author, date: props.date, postID: props.postID, authorID: props.authorID });
                    }}

                />
            }

        </View>


    )

};

const styles = StyleSheet.create({
    cardViewStyle: {
        fontSize: 30,
        backgroundColor: '#d1d4c9',
        width: '92%',
        alignSelf: "center",
    },
    textStyle: {
        fontSize: 13,

    },
    buttonStyle: {
        borderColor: '#17223B',
        marginHorizontal: 10,
        borderBottomColor: 'white',
        borderWidth: 1,
    }
});
export default NotificationCard;