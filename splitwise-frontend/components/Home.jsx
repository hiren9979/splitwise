import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import API_BASE_URL from "../apiConfig";
import { TouchableOpacity } from "react-native-gesture-handler";
import AddExpenseModal from './AddExpenseForm'; // Updated import

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

  const handlePress = (item) => {
    navigation.navigate("PersonalHistory", { item });
  };

  const openAddExpenseForm = ()=>{
    navigation.navigate("AddExpenseForm");
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {data.map((item) => (
          <TouchableOpacity
            key={item.id.toString()}
            onPress={() => {
              handlePress(item);
            }}
          >
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDetail}>Email: {item.email}</Text>
              <Text style={styles.cardDetail}>id: {item.id}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Circle Button */}
      <TouchableOpacity style={styles.circleButton} onPress={openAddExpenseForm}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  scrollView: {
    width: "100%",
  },
  errorText: {
    color: "red",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: "100%",
    shadowColor: "#000",
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
    fontWeight: "bold",
  },
  cardDetail: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  circleButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 25,
    width: 50,
    height: 50,
    bottom: Dimensions.get('window').height * 0.05, 
    right: Dimensions.get('window').width * 0.05, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
