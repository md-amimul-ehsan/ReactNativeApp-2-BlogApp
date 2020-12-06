import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, AuthProvider } from './src/providers/AuthProvider';
import AppDrawerScreen from './src/navigations/AppDrawerScreen';
import AuthStackScreen from './src/navigations/AuthStackScreen';

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
