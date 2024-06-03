import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Friends = () => {
  return (
    <View>
      <Text>Friends</Text>
      <View style={styles.card}>
        <View style={styles.leftContent}>
          <Text style={styles.name}>{"hiren"}</Text>
        </View>
        <Text style={styles.amount}>{"32332"}</Text>
      </View>
    </View>
  );
};

export default Friends;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
    marginTop: 20,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
});
