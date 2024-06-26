// Home.js

import "react-native-gesture-handler";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AddExpenseForm from "./AddExpenseForm";
import React from "react";
import Dashboard from "./Home";
import PersonalHistory from "./PersonalHistory";

const Drawer = createDrawerNavigator();

const MainPage = () => {
  function logout(){
  }
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Profile" component={Dashboard} />
      <Drawer.Screen name="Settings" component={Dashboard} />
      <Drawer.Screen name="PersonalHistory" component={PersonalHistory} />
      <Drawer.Screen name="AddExpenseForm" component={AddExpenseForm} />

      <Drawer.Screen
        name="Logout"
        component={Dashboard}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Text>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MainPage;
