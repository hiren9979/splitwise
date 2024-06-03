import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from "react-native";

const Signup = ({ navigation }) => {
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = () => {
    console.log(signupForm);
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
            placeholder="Username"
            value={signupForm.username}
            onChangeText={(text) => handleInputChange("username", text)}
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
        <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
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
    width: '80%',
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
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
    color: "#333",
  },
  input: {
    width: '100%',
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
    color: 'blue',
  }
});
