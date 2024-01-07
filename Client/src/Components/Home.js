import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.helloWorld}>Hello world !!!</Text>

      <Button
        style={styles.redirectToLogin}
        title="Go to Jane's profile"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  helloWorld: {
    fontSize: 20,
    marginBottom: 20,
  },
  redirectToLogin: {
    marginTop: 20,
  },
});
export default Home;
