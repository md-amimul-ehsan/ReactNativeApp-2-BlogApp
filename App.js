import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, AuthProvider } from './src/providers/AuthProvider';
import AppDrawerScreen from './src/navigations/AppDrawerScreen';
import AuthStackScreen from './src/navigations/AuthStackScreen';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD25NVubOXcj0bC226ovKOvVl89JlkEQQU",
  authDomain: "blogapp-e7df7.firebaseapp.com",
  databaseURL: "https://blogapp-e7df7-default-rtdb.firebaseio.com",
  projectId: "blogapp-e7df7",
  storageBucket: "blogapp-e7df7.appspot.com",
  messagingSenderId: "941601724251",
  appId: "1:941601724251:web:0e56933c6696793ea82c7e"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
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
