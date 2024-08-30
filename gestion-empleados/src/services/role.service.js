import axiosInstance from "../api/axiosConfig";

export const fetchRole = async () => {
  try {
    let token = localStorage.getItem("authToken");
    const response = await axiosInstance.get("/role", {
      headers: token ? { "x-token": token } : {},
    });

    return response.data.roles;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al obtener roles");
  }
};
