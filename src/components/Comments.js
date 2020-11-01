import React, { useState } from 'react';
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

const Comments = (props) => {

    return (
        <View style={styles.rootViewStyle}>
            <Card containerStyle={styles.cardStyle}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: 'space-between'
                    }}
                >
                    <Text h4Style={{ padding: 10, color: 'white' }} h4>
                    {props.name}
                    </Text>
                    <Text style={{color:'white'}}>{props.date}</Text>
                </View>
                <Text
                    style={{
                        padding: 10,
                        color: "white"
                    }}
                >
                    {props.comment}
                </Text>
            </Card>
            <Card.Divider/>
        </View>
    );
}

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: '#17223B',
        borderColor: '#17223B',
        borderRadius: 15,
        width: '95%',
    },
    rootViewStyle: {
        flex: 1,
    },
});

export default Comments;