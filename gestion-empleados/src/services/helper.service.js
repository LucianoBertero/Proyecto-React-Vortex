import axiosInstance from "../api/axiosConfig";

const getUserRol = async () => {
  let token = localStorage.getItem("authToken");
  try {
    const response = await axiosInstance.post("/auth/checkpermissions", {
      token, // Si la clave y el valor son iguales, puedes usar solo el nombre
    });
    return response.data;
  } catch (error) {
    // Devuelve un mensaje más informativo en caso de error
    throw new Error(
      error.response?.data?.message || "Error al consumir el token"
    );
  }
};

export default getUserRol;
