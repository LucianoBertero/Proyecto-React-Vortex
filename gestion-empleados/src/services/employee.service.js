import axiosInstance from "../api/axiosConfig";

export const deleteEmployee = async (employeeId) => {
  try {
    let token = localStorage.getItem("authToken");
    const response = await axiosInstance.delete(`/employee/${employeeId}`, {
      headers: token ? { "x-token": token } : {},
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const dischargeEmployee = async (employeeId) => {
  try {
    let token = localStorage.getItem("authToken");
    const response = await axiosInstance.put(
      `/employee/${employeeId}`,
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

export const createEmployee = async (employeeData) => {
  try {
    let token = localStorage.getItem("authToken");
    const response = await axiosInstance.post(
      "/employee/createEmployee",
      employeeData,
      {
        headers: token ? { "x-token": token } : {},
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const fetchEmployeeById = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axiosInstance.get(`/employee/${id}`, {
      headers: {
        "x-token": token,
      },
    });
    return response.data.employee;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener el empleado"
    );
  }
};

export const updateEmployee = async (employeeId, employeeData) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axiosInstance.put(
      `/employee/updateEmployee/${employeeId}`,
      employeeData,
      {
        headers: {
          "x-token": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al actualizar el empleado"
    );
  }
};
