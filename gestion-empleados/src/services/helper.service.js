import axios from "axios";

const API_URL = "http://localhost:3000";

const getUserRol = async () => {
  let token = localStorage.getItem("authToken");
  try {
    const response = await axios.post(`${API_URL}/auth/checkpermissions`, {
      token: token,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return "Error al consumir el token";
  }
};

export default getUserRol;
