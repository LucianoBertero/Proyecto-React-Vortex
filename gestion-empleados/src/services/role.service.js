// services/authService.js
import axios from "axios";
const API_URL = "http://localhost:3000";

export const fetchRole = async () => {
  try {
    let token = localStorage.getItem("authToken");
    const response = await axios.get(`http://localhost:3000/role`, {
      headers: {
        "x-token": token,
      },
    });
    return response.data.roles;
  } catch (error) {}
};
