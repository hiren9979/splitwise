import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import API_BASE_URL from "../apiConfig";
import { fetchUserData } from "../Common/commonFunctions";

const AddExpenseForm = ({ navigation }) => {
  const [form, setForm] = useState({
    selectedItems: [],
    name: "",
    amount: "",
    description: "",
    paidBy: "",
  });
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Selected:", form.selectedItems);

  useEffect(() => {
    console.log("Loading data...");
    getUserList();
  }, []);

  const getUserList = async () => {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        Authorization: "Bearer your_auth_token", // Replace with actual auth token
        "Content-Type": "application/json",
      }),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/`, requestOptions);
      const jsonRes = await response.json();

      if (response.status === 200) {
        setUserList(jsonRes);
      } else {
        setError("Failed to fetch data");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async () => {
    console.log("form added", form);
    const requestOptions = {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer your_auth_token", // Replace with actual auth token
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        name: form.name,
        amount: form.amount,
        owedBy: form.selectedItems,
        description: form.description,
        paidBy: form.paidBy,
      }),
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/addExpense/equally`,
        requestOptions
      );
      const jsonRes = await response.json();
  
      console.log("addExpense response: ", jsonRes);

      if (response.status === 200) {
        setForm({
          selectedItems: [],
          name: "",
          amount: "",
          paidBy: "",
        });
      } else {
        setError("Failed to add expense");
      }
    } catch (err) {
      setError(err.message || "Failed to add expense");
      console.log(err);
    }
  };

  const submitForm = async () => {
    try {
      const loginUser = await fetchUserData();
      console.log("loginUser : ", loginUser.id);

      if (loginUser && loginUser.id) {
        setForm((prevForm) => ({
          ...prevForm,
          paidBy: loginUser.id,
          name: loginUser.name,
        }));
      } else {
        console.error("No user data found or invalid user object returned.");
        return;
      }

      await addExpense();
    } catch (error) {
      console.error("Error fetching user data or adding expense:", error);
      setError("Failed to submit form. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
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
    <View style={styles.container}>
      <SectionedMultiSelect
        items={userList}
        IconRenderer={Icon}
        uniqueKey="id"
        onSelectedItemsChange={(selectedItems) =>
          setForm({ ...form, selectedItems })
        }
        selectedItems={form.selectedItems}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
      />
      <TextInput
        placeholder="Amount"
        style={styles.input}
        value={form.amount}
        onChangeText={(text) => setForm({ ...form, amount: text })}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
  },
});

export default AddExpenseForm;
