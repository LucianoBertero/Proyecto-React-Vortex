// services/authService.js
import axios from "axios";

const API_URL = "http://localhost:3000";

export const login = async (email, password) => {
  try {
    const response = await axios.get(`${API_URL}/auth/login`, {
      params: { email, password },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};
