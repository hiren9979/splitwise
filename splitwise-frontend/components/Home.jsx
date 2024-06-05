import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import API_BASE_URL from "../apiConfig";

const Home = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserList = async () => {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        Authorization: "Bearer your_auth_token",
        "Content-Type": "application/json",
      }),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/`, requestOptions);
      const jsonRes = await response.json();
      console.log(jsonRes);

      if (response.status === 200) {
        setData(jsonRes);
        if (jsonRes.status !== 404) {
          navigation.navigate("Home");
        }
      } else {
        setError("Failed to fetch data");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((item) => (
        <View key={item.id.toString()} style={styles.card}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardDetail}>Email: {item.email}</Text>
          <Text style={styles.cardDetail}>id: {item.id}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
