// services/authService.js
import axios from "axios";
const API_URL = "http://localhost:3000";
const token = localStorage.getItem("authToken");

export const fetchRole = async () => {
  try {
    const response = await axios.get(`${API_URL}/checkpermissions`, {
      token: token,
    });
    return response.data.roles;
  } catch (error) {}
};
