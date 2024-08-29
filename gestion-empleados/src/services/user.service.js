// services/authService.js
import axios from "axios";

const API_URL = "http://localhost:3000";
const token = localStorage.getItem("authToken");

export const login = async (employeeId) => {
  try {
    const response = await axios.get(`${API_URL}/employee/${employeeId}`, {
      headers: { "x-token": token },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const deleteUser = async (userId) => {
  try {
    console.log(userId);
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: {
        "x-token": token,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const dischargeUser = async (userId) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/restore/${userId}`,
      {},
      {
        headers: { "x-token": token },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const updateUser = async ({ userId, data }) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, data, {
      headers: { "x-token": token },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const registerUser = async ({ data }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data, {
      headers: {
        "x-token": token,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};
