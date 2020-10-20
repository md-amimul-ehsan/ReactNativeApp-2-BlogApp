import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Octicons, Entypo } from '@expo/vector-icons';
import { DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';

import { AuthContext } from '../providers/AuthProvider';

const DrawerContent = (props) => {
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.rootViewStyle}>
                    <View style={styles.drawerContent}>
                        <Drawer.Section>
                            <Text style={styles.textStyle}>
                                Welcome {auth.currentUser.name} !
                            </Text>
                        </Drawer.Section>
                        <Drawer.Section style={styles.homeDrawerSection}>
                            <DrawerItem
                                icon={() => (
                                     <Entypo name="home" color="white" size={30} />
                                )}
                                label="Home"
                                style={{borderBottomColor: 'white'}}
                                labelStyle={styles.labelStyle}
                                onPress={() => { props.navigation.navigate('Home') }}
                            />
                        </Drawer.Section>
                        <Drawer.Section style={styles.profileDrawerSection}>
                            <DrawerItem
                                icon={() => (
                                    <Entypo name="user" size={30} color="white" />
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
                                <Octicons name="sign-out" size={30} color="white" />
                            )}
                            label="Sign Out"
                            labelStyle={styles.labelStyle}
                            onPress={
                                function () {
                                    auth.setIsLoggedIn(false);
                                    auth.setCurrentUser({});
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
        backgroundColor: '#6B778D',
    },
    drawerContent: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#6B778D',
        marginTop: 50,
    },
    homeDrawerSection: {
        borderBottomWidth:1,
        borderTopWidth:1,
        borderBottomColor: 'white',
        borderTopColor: 'white',
    },
    profileDrawerSection: {
        borderBottomWidth:1,
        borderBottomColor: 'white',
    },
    bottomDrawerSection: {
        borderTopColor: 'white',
        borderTopWidth: 1,
        backgroundColor: '#6B778D',
    },
    labelStyle: {
        color: 'white',
        fontSize: 20,
    },
    textStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        marginVertical: 20,
    }
});

export default DrawerContent;