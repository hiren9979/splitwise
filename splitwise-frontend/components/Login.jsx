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

const Login = ({ navigation }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const headers = {
    Authorization: "Bearer your_auth_token",
    "Content-Type": "application/json",
    email: loginForm.email,
    password: loginForm.password,
  };

  const requestOptions = {
    method: "GET", // or 'GET', 'PUT', etc. depending on your API endpoint
    mode: "cors",
    headers: {
      Authorization: "Bearer your_auth_token",
      "Content-Type": "application/json",
      email: loginForm.email,
      password: loginForm.password,
    },
  };

  const handleInputChange = (name, value) => {
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = () => {
    console.log("here is this ");
    navigation.navigate("Signup");
  };

  const handleLogin = async () => {
    console.log(loginForm);
    const response = await fetch(`${API_BASE_URL}/auth/login`, requestOptions)
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          if (res.status === 200) {
            setMessage(jsonRes.message);
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    const jsonData = await response.json();
    setData(jsonData); // Update state with fetched data
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginPageContainer}>
        <Text style={styles.title}>LOGIN</Text>
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
