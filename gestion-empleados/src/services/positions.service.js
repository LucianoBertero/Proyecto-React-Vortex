// services/authService.js
import axios from "axios";

const API_URL = "http://localhost:3000";
const token = localStorage.getItem("authToken");
export const fetchPositions = async () => {
  let token = localStorage.getItem("authToken");
  try {
    const response = await axios.get(`http://localhost:3000/position`, {
      headers: {
        "x-token": token,
      },
    });
    return response.data.positions;
  } catch (error) {}
};

export const deletePositions = async (namePosition) => {
  try {
    let token = localStorage.getItem("authToken");
    const response = await axios.delete(
      `http://localhost:3000/position`,

      {
        headers: {
          "x-token": token,
        },
        data: { name: namePosition },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const createPosition = async (namePosition) => {
  try {
    let token = localStorage.getItem("authToken");
    const response = await axios.post(
      `http://localhost:3000/position/register`,
      { name: namePosition },
      {
        headers: {
          "x-token": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};
