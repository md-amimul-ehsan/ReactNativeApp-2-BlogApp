import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Octicons, Entypo } from '@expo/vector-icons';
import { DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import * as firebase from 'firebase';

import { AuthContext } from '../providers/AuthProvider';

const DrawerContent = (props) => {
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.rootViewStyle}>
                    <View style={styles.drawerContent}>
                        <Drawer.Section>
                            <Text style={styles.textStyle}>
                                Welcome {auth.currentUser.displayName} !
                            </Text>
                        </Drawer.Section>
                        <Drawer.Section style={styles.homeDrawerSection}>
                            <DrawerItem
                                icon={() => (
                                    <Entypo name="home" color="black" size={30} />
                                )}
                                label="Home"
                                style={{ borderBottomColor: 'black' }}
                                labelStyle={styles.labelStyle}
                                onPress={() => { props.navigation.navigate('Home') }}
                            />
                        </Drawer.Section>
                        <Drawer.Section style={styles.profileDrawerSection}>
                            <DrawerItem
                                icon={() => (
                                    <Entypo name="user" size={30} color="black" />
                                )}
                                label="Profile"
                                labelStyle={styles.labelStyle}
                                onPress={() => { props.navigation.navigate('Profile') }}
                            />
                        </Drawer.Section>
                    </View>
                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={() => (
                                <Octicons name="sign-out" size={30} color="black" />
                            )}
                            label="Sign Out"
                            labelStyle={styles.labelStyle}
                            onPress={
                                function () {
                                    firebase
                                        .auth()
                                        .signOut()
                                        .then(()=>{
                                            auth.setIsLoggedIn(false);
                                            auth.setCurrentUser({});
                                        })
                                        .catch((error) => {
                                            alert(error);
                                        })
                                }
                            }
                        />
                    </Drawer.Section>
                </View>
            )}
        </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create({
    rootViewStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#CDDAF2',
    },
    drawerContent: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#CDDAF2',
        marginTop: 50,
    },
    homeDrawerSection: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: 'black',
        borderTopColor: 'black',
    },
    profileDrawerSection: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    bottomDrawerSection: {
        borderTopColor: 'black',
        borderTopWidth: 1,
        backgroundColor: '#CDDAF2',
    },
    labelStyle: {
        color: 'black',
        fontSize: 20,
    },
    textStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
        marginVertical: 20,
        padding: 15,
    }
});

export default DrawerContent;