import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Header } from "react-native-elements";

const HomeScreen = (props) => {
    return (
      <View style={styles.rootViewStyle}>
         <Header
            containerStyle={{borderBottomColor:'#6B778D'}}
            backgroundColor='#6B778D'
            leftComponent={{
              icon: "menu",
              color: "white",
              onPress: function () {
                props.navigation.toggleDrawer();
              }
            }}
          />
        <Text style={{color:'white'}}> Home </Text>
      </View>
    );
}

const styles = StyleSheet.create({
  rootViewStyle: {
    flex: 1,
    backgroundColor: '#17223B',
  },
});

export default HomeScreen;
