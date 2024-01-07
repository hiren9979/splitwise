import axios from "axios";

const baseURL = "http://192.168.29.147:3000/Users";

const login = async (req) => {
  const { email, password } = req;
  console.log(email, password);
  try {
    const response = await axios.post(
      `${baseURL}/login`, // Corrected the URL
      {
        email,
        password,
      },
      {
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        timeout: 5000, // Set a timeout of 5 seconds (adjust as needed)
      }
    );
    return response.data; // Assuming the backend returns a JSON object
  } catch (error) {
    return { success: false, message: "An error occurred during login" };
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await axios.post(`${baseURL}/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "An error occurred during registration",
    };
  }
};

export { login, register };
