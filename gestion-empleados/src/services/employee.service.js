// services/authService.js
import axios from "axios";

const API_URL = "http://localhost:3000";

export const deleteEmployee = async (employeeId) => {
  try {
    let token = localStorage.getItem("authToken");
    const response = await axios.delete(`${API_URL}/employee/${employeeId}`, {
      headers: { "x-token": token },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const dischargeEmployee = async (employeeId) => {
  try {
    console.log(employeeId);
    let token = localStorage.getItem("authToken");
    console.log(token);
    const response = await axios.put(
      `${API_URL}/employee/${employeeId}`,
      {},
      {
        // Cambiado aquí
        headers: { "x-token": token },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const createEmployee = async (employeeData) => {
  try {
    let token = localStorage.getItem("authToken");
    const response = await axios.post(
      `${API_URL}/employee/createEmployee`,
      employeeData,
      {
        headers: { "x-token": token },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};
