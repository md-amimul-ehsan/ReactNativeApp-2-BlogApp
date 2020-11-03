import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Entypo } from '@expo/vector-icons';

const ImagePickerExample = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View >
      {image && <Image source={{ uri: image }} style={styles.photoStyle} />}
      <Button 
        title="   Choose Photo" 
        onPress={pickImage} 
        icon ={<Entypo name="camera" size={24} color="white" />}
        buttonStyle={styles.outlineButtonStyle}
        titleStyle={{ color: "white" }}
        type='outline'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outlineButtonStyle: {
    borderColor: "white",
    borderWidth: 1,
    width: '90%',
  },
  photoStyle: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
  },
});

export default ImagePickerExample;