import React from 'react';
import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import NotificationScreen from '../screens/NotificationScreen';
import IndividualPostStack from '../navigations/IndividualPostStack';

const HomeTab = createMaterialBottomTabNavigator();

const HomeTabScreen = () => {
    //console.log(props);
    return (
      <HomeTab.Navigator
        initialRouteName="Home"
        barStyle={{ backgroundColor: '#6B778D' }}
      >
        <HomeTab.Screen
          name="Home"
          component={IndividualPostStack}
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

  export default HomeTabScreen;