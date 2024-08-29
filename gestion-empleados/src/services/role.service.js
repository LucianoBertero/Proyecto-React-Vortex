// services/authService.js
import axios from "axios";

export const fetchRole = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`http://localhost:3000/role`, {
      headers: {
        "x-token": token,
      },
    });
    return response.data.roles;
  } catch (error) {}
};
