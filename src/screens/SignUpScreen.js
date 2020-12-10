import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Card, SocialIcon } from 'react-native-elements';
import { FontAwesome, Entypo, Octicons, AntDesign, Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import "firebase/firestore";
import Loading from './../components/Loading';

const SignInScreen = (props) => {
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <View style={styles.rootViewStyle}>
        <Card containerStyle={styles.cardStyle}>
          <Input
            inputContainerStyle={styles.inputStyle}
            style={{ color: 'white' }}
            leftIcon={<Ionicons name="ios-person" size={24} color="white" />}
            placeholder='Name'
            onChangeText={function (currentInput) {
              setName(currentInput);
            }}
          />
          <Input
            inputContainerStyle={styles.inputStyle}
            style={{ color: 'white' }}
            leftIcon={<FontAwesome name="envelope" size={24} color="white" />}
            placeholder='Email Address'
            onChangeText={function (currentInput) {
              setEmail(currentInput);
            }}
          />
          <Input
            inputContainerStyle={styles.inputStyle}
            style={{ color: 'white' }}
            leftIcon={<AntDesign name="idcard" size={24} color="white" />}
            placeholder='Student ID'
            onChangeText={function (currentInput) {
              setStudentID(currentInput);
            }}
          />
          <Input
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
            icon={<AntDesign name="user" size={24} color="white" />}
            title="   Create an account"
            titleStyle={{ color: "white" }}
            buttonStyle={styles.outlineButtonStyle}
            type='outline'
            onPress={() => {
              if (name && studentID && email && password) {
                setIsLoading(true);
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then((userCreds) => {
                    userCreds.user.updateProfile({ displayName: name});
                    firebase
                      .firestore()
                      .collection('users')
                      .doc(userCreds.user.uid)
                      .set({
                        name: name,
                        studentID: studentID,
                        email: email,
                        photo_uri: "N/A",
                        notifications:[],
                      })
                      .then(() => {
                        setIsLoading(false);
                        alert('Account created successfully!');
                        // console.log(userCreds.user);
                        props.navigation.navigate("SignIn");
                      })
                      .catch((error) => {
                        setIsLoading(false);
                        alert(error);
                      });
                  })
                  .catch((error) => {
                    setIsLoading(false);
                    alert(error)
                  })
              } else {
                alert('fields cannot be empty!')
              }
            }}
          />
          <Button
            icon={<Octicons name="sign-in" size={24} color="white" />}
            title="   Already have an account?"
            titleStyle={{ color: "white" }}
            buttonStyle={styles.clearButtonStyle}
            type='clear'
            onPress={
              function () {
                props.navigation.navigate("SignIn")
              }
            }
          />
        </Card>
      </View>
    );
  }
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
    borderRadius: 60,
    width: '80%',
  },
  inputStyle: {
    borderBottomColor: 'white',
  },
  outlineButtonStyle: {
    borderColor: "white",
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
  },
  clearButtonStyle: {
    alignSelf: 'center',
    paddingTop: 15,
  },
})

export default SignInScreen;
