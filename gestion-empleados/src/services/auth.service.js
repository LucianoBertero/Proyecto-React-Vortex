import axiosInstance from "../api/axiosConfig";

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.get("/auth/login", {
      params: { email, password },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const sendRecoveryEmail = async (email) => {
  try {
    const response = await axiosInstance.post("/recover-pass", { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const recoverPass = async (token, password) => {
  try {
    const response = await axiosInstance.post(`/recover-pass/${token}`, {
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};
