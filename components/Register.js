import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, View, Alert } from 'react-native';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    
      const response = await fetch('http://192.168.111.31:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name: name, username: username, password: password }),
      });
      const data = await response.json();
      if (data.message === "Success") {
        Alert.alert('Registration Successful', 'Account Created Successfully 🥳🥳', [
          { text: 'OK', onPress: () => navigation.navigate("Login") }
        ]);
      } else {
        Alert.alert('Registration Failed', 'User already exists. Please choose a different username.');
      }
  };

  const isRegisterDisabled = !name || !username || !password;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Register"
            onPress={handleRegister}
            disabled={isRegisterDisabled}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 120,
    marginLeft: 50
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
    marginLeft: 12
  },
});

export default Register;
