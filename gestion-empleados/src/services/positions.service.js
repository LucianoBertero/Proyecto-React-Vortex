import axiosInstance from "../api/axiosConfig";

export const fetchPositions = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axiosInstance.get("/position", {
      headers: token ? { "x-token": token } : {},
    });
    return response.data.positions;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener posiciones"
    );
  }
};

export const deletePositions = async (namePosition) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axiosInstance.delete("/position", {
      headers: token ? { "x-token": token } : {},
      data: { name: namePosition },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al eliminar posición"
    );
  }
};

export const createPosition = async (namePosition) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axiosInstance.post(
      "/position/register",
      {
        name: namePosition,
      },
      {
        headers: token ? { "x-token": token } : {},
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al crear posición");
  }
};
