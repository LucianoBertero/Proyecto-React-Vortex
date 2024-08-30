import axiosInstance from "../api/axiosConfig";

export const login = async (employeeId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axiosInstance.get(`/employee/${employeeId}`, {
      headers: token ? { "x-token": token } : {},
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axiosInstance.delete(`/users/${userId}`, {
      headers: token ? { "x-token": token } : {},
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const dischargeUser = async (userId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axiosInstance.put(
      `/users/restore/${userId}`,
      {},
      {
        headers: token ? { "x-token": token } : {},
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const updateUser = async ({ userId, data }) => {
  try {
    let token = localStorage.getItem("authToken");
    const response = await axiosInstance.put(`/users/${userId}`, data, {
      headers: token ? { "x-token": token } : {},
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const registerUser = async ({ data }) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axiosInstance.post(`/auth/register`, data, {
      headers: token ? { "x-token": token } : {},
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};
export const fetchUserById = async (id) => {
  try {
    let token = localStorage.getItem("authToken");
    const response = await axiosInstance.get(`/users/${id}`, {
      headers: {
        "x-token": token,
      },
    });
    return response.data.user;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener el usuario"
    );
  }
};
