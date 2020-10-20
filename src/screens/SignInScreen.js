import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { FontAwesome, Entypo, Octicons, AntDesign } from '@expo/vector-icons';
import {AuthContext} from '../providers/AuthProvider'
import { getDataJSON } from "../functions/AsyncStorageFunctions"; 

const SignInScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.rootViewStyle}>
          <Card containerStyle={styles.cardStyle}>
            <Card.Title style={{ fontSize: 20, color: 'white' }}>Welcome to The Blogbuzzter !</Card.Title>
            <Card.Divider />
            <Input
              placeholderTextColor='white'
              inputContainerStyle={styles.inputStyle}
              style={{ color: 'white' }}
              leftIcon={<FontAwesome name="envelope" size={24} color="white" />}
              placeholder='Email Address'
              onChangeText={function (currentInput) {
                setEmail(currentInput);
              }}
            />
            <Input
              placeholderTextColor='white'
              inputContainerStyle={styles.inputStyle}
              style={{ color: 'white' }}
              leftIcon={<Entypo name="key" size={24} color="white" />}
              placeholder='Password'
              secureTextEntry={true}
              onChangeText={function (currentInput) {
                setPassword(currentInput);
              }}
            />
            <Button
              icon={<Octicons name="sign-in" size={24} color="white" />}
              title="   Sign In"
              titleStyle={{ color: "white" }}
              buttonStyle={styles.outlineButtonStyle}
              type='outline'
              onPress={async function () {
                let userData = await getDataJSON(email);
                if (userData!= null && userData.password == password) {
                  auth.setIsLoggedIn(true);
                  auth.setCurrentUser(userData);
                  //console.log(auth.isLoggedIn);
                } else {
                  alert("Login Failed!");
                  //console.log(userData);
                }
              }}
            />
            <Button
              icon={<AntDesign name="user" size={24} color="white" />}
              title="   Don't have an account?"
              titleStyle={{ color: "white" }}
              buttonStyle={styles.clearButtonStyle}
              type='clear'
              onPress={
                function () {
                  props.navigation.navigate("SignUp")
                }
              }
            />
          </Card>
        </View>
      )}
    </AuthContext.Consumer>
  );
}

const styles = StyleSheet.create({
  rootViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17223B',
  },
  cardStyle: {
    backgroundColor: '#6B778D',
    borderColor: '#6B778D',
    borderRadius: 50,
    width: '80%',
  },
  inputStyle: {
    borderBottomColor: 'white',
  },
  outlineButtonStyle: {
    borderColor: "white",
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
  },
  clearButtonStyle: {
    alignSelf: 'center',
    paddingTop: 15,
  },
})

export default SignInScreen;
