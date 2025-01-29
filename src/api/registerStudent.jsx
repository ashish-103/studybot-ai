import axios from "axios";

const registerStudent = async ({ email, password }) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/user/register",
      email,
      password
    );
    console.log("Registration successful:", response.data);
    // Handle success (e.g., show a success message, close modal, etc.)
  } catch (error) {
    console.error(
      "Error during registration:",
      error.response?.data || error.message
    );
  }
};



export default registerStudent