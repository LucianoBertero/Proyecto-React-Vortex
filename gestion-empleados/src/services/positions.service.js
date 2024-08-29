// services/authService.js
import axios from "axios";
const token = localStorage.getItem("authToken");
export const fetchPositions = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/position`, {
      headers: {
        "x-token": token,
      },
    });
    console.log(response.data);
    return response.data.positions;
  } catch (error) {}
};
