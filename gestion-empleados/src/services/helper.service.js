import axios from "axios";

const endpoint = async (token) => {
  try {
    const response = await axios.post("/token", { token });
    return response.data;
  } catch (error) {
    console.error(error);
    return "Error al consumir el token";
  }
};

export default endpoint;
