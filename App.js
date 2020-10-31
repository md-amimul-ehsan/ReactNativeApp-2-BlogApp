import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from './src/components/DrawerContent';
import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import PostScreen from './src/screens/PostScreen';
import { AuthContext, AuthProvider } from './src/providers/AuthProvider';
import PostCard from './src/components/PostCard';

const AuthStack = createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
const stack = createStackNavigator();

const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <AppDrawer.Screen name="Home" component={HomeTabScreen} />
      <AppDrawer.Screen name="Profile" component={ProfileScreen} />
    </AppDrawer.Navigator>
  );
};

const individualPostStack = () => {
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

const HomeTabScreen = () => {
  return (
    <HomeTab.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: '#6B778D' }}
    >
      <HomeTab.Screen

        name="Home"
        //component={HomeScreen}
        component={individualPostStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" color="white" size={26} />
            ) : (
                <AntDesign name="home" color="white" size={22} />
              ),
        }}
      />
      <HomeTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="bell-ring" size={26} color="white" />
            ) : (
                <MaterialCommunityIcons name="bell-ring-outline" size={22} color="white" />
              ),
        }}
      />
    </HomeTab.Navigator>
  );
};

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }} />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}

function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.isLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>)}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
