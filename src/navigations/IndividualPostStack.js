import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "../screens/HomeScreen";
import PostScreen from '../screens/PostScreen';

const stack = createStackNavigator();

const IndividualPostStack = () => {
    return (
      <stack.Navigator initialRouteName="Home">
        <stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="Post"
          component={PostScreen}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    );
  }

  export default IndividualPostStack;