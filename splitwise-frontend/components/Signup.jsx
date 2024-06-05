import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import API_BASE_URL from "../apiConfig";

const Signup = ({ navigation }) => {
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const requestOptions = {
    method: "POST", // or 'GET', 'PUT', etc. depending on your API endpoint
    mode: "cors",
    headers: {
      Authorization: "Bearer your_auth_token",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: signupForm.name,
      email: signupForm.email,
      password: signupForm.password,
    }),
  };

  const handleInputChange = (name, value) => {
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    console.log(signupForm);
    const response = await fetch(
      `${API_BASE_URL}/auth/createUser`,
      requestOptions
    )
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          console.log(jsonRes);
          if (res.status === 200) {
            setMessage(jsonRes.message);
            navigation.navigate("Signup");
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
    // Perform signup logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signupPageContainer}>
        <Text style={styles.title}>SIGN UP</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="name"
            value={signupForm.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={signupForm.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={signupForm.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
        </View>
        <Button title="Sign Up" onPress={handleSignup} />
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  signupPageContainer: {
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
  loginText: {
    marginTop: 20,
  },
  loginLink: {
    color: "blue",
  },
});
