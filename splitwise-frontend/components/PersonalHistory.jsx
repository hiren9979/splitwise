import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const PersonalHistory = () => {
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(null);


    const route = useRoute();
    const userInfo = route.params.item;

      useEffect(() => {
        const fetchUserData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('userDetails');
                setUserData(jsonValue != null ? JSON.parse(jsonValue) : null);
            } catch (e) {
                console.error('Failed to fetch the data from storage', e);
            }
        };

        fetchUserData();
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World! {userInfo.email}</Text>
      <View style={styles.container}>
      {userData ? (
        <>
          <Text style={styles.title}>Name: {userData.name}</Text>
          <Text style={styles.detail}>Email: {userData.email}</Text>
          <Text style={styles.detail}>ID: {userData.id}</Text>
        </>
      ) : (
        <Text style={styles.detail}>No user data found</Text>
      )}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default PersonalHistory;
