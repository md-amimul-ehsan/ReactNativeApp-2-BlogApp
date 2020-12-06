import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import {StyleSheet} from 'react-native';

const Loading =() => {
    return (
        <View style={styles.rootViewStyle}>
            <ActivityIndicator
                size='large'
                color='white'
                animating={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rootViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#17223B',
      },
});

export default Loading;