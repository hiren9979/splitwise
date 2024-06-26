import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import API_BASE_URL from "../apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const storeUserData = async (userData) => {
    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(userData.authData));

      console.log('User data stored successfully');
      const jsonValue = await AsyncStorage.getItem('userDetails');
    } catch (e) {
      console.error('Failed to save the data to the storage', e);
    }
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  const handleLogin = async () => {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        Authorization: "Bearer your_auth_token",
        "Content-Type": "application/json",
        email: loginForm.email,
        pwd: loginForm.password,
      }),
    };
    const response = await fetch(`${API_BASE_URL}/auth/login`, requestOptions)
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          if (res.status === 200) {
            if (jsonRes.status === 404) {
            } else {
              await storeUserData(jsonRes);
              navigation.navigate("Home");
            }
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container} className="flex-1 items-center">
      <View style={styles.loginPageContainer}>
        <Text style={styles.title} className="p-100">
          LOGIN
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={loginForm.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={loginForm.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
        </View>
        <Button title="Login" onPress={handleLogin} />
        <TouchableOpacity onPress={handleSignup}>
          <Text style={styles.signupLink}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loginPageContainer: {
    width: "80%",
    backgroundColor: "#EAF2F8",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    padding: 10,
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
});
