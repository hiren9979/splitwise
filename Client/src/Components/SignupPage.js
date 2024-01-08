import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import loginImg from "../assets/loginImg.jpg";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup
import { register } from "../Services/authService";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string().required("Name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  Repassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repassword is required"),
});

export default function SignupPage() {
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: { email: "", password: "", Repassword: "", name: "" },
    onSubmit: () => {
      CreateUser(formik.values);
    },
    validationSchema: validationSchema,
  });

  async function CreateUser(values) {
    try {
      if (!values) {
        console.error("Form values are undefined or null");
        return;
      }

      const result = await register(values);
      if (result.success) {
        alert("Signup", result);
      } else {
        alert(`Signup failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during Signup:", error);
      alert("An error occurred during Signup");
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Image source={loginImg} style={styles.loginImg} />
      <View style={styles.innerContainer}>
        <Text style={styles.mainHeader}>Signup Form</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          onChangeText={formik.handleChange("name")}
          value={formik.values.name}
          onBlur={formik.handleBlur("name")} // Track field blur for validation
        />
        {formik.touched.name && formik.errors.name && (
          <Text style={styles.errorText}>{formik.errors.name}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Please enter email!"
          onChangeText={formik.handleChange("email")}
          value={formik.values.email}
          onBlur={formik.handleBlur("email")} // Track field blur for validation
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.errorText}>{formik.errors.email}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          onChangeText={formik.handleChange("password")}
          value={formik.values.password}
          secureTextEntry
          onBlur={formik.handleBlur("password")} // Track field blur for validation
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Re-Enter password"
          onChangeText={formik.handleChange("Repassword")}
          value={formik.values.Repassword}
          secureTextEntry
          onBlur={formik.handleBlur("Repassword")} // Track field blur for validation
        />
        {formik.touched.Repassword && formik.errors.Repassword && (
          <Text style={styles.errorText}>{formik.errors.Repassword}</Text>
        )}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={formik.handleSubmit}
        >
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Already an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "purple", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  signupText: {
    marginRight: 5,
  },
  signupButton: {
    padding: 5,
    borderRadius: 5,
    color: "red",
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  innerContainer: {
    width: "80%",
    padding: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "blue",
    marginTop: 30,
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  loginText: {
    color: "white",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "gray",
  },
  loginImg: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});
