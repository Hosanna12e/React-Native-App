import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button, Image, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = () => {
  const [youtubeURL, setYoutubeURL] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {

      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername != null){
        const response = await fetch(`http:// 192.168.111.31:5000/youtube_summary?username=${storedUsername}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ youtube_url: youtubeURL }),
        });
        const data = await response.json();
        if (data.error) {
          Alert.alert('Error', data.error);
        } else {
          setSummary(data.response);
          setThumbnailURL(data.thumbnail_url);
          setVideoTitle(data.video_title);
        }
      }
      else{
        Alert.alert("Cannon't use Chat feature without loggin in");
      }
  };

  const handleInputChange = (text) => {
    setYoutubeURL(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter YouTube video URL"
          onChangeText={handleInputChange}
          value={youtubeURL}
        />
        <View style={styles.buttonContainer}>
          <Button title="Summarize" onPress={handleSummarize} />
        </View>
      </View>
      <ScrollView>
        <View style={styles.outputContainer}>
          <Text>Video Title: {videoTitle}</Text>
          {thumbnailURL !== '' && <Image source={{ uri: thumbnailURL }} style={styles.thumbnail} />}
          <Text>Summary: {summary}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    width: '100%',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginLeft: 12,
  },
  outputContainer: {
    marginLeft: 12,
  },
  thumbnail: {
    width: 366,
    height: 250,
  },
});

export default Chat;
