import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from '../components/DrawerContent';
import ProfileScreen from '../screens/ProfileScreen';
import HomeTabScreen from '../navigations/HomeTabScreen';

const AppDrawer = createDrawerNavigator();

const AppDrawerScreen = () => {
    //console.log(props);
    return (
      <AppDrawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <AppDrawer.Screen name="Home" component={HomeTabScreen}/>
        <AppDrawer.Screen name="Profile" component={ProfileScreen}  />
      </AppDrawer.Navigator>
    );
  };

  export default AppDrawerScreen;