import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const token = localStorage.getItem("authToken");

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await axios.get("http://localhost:3000/employee", {
      headers: {
        "x-token": token, // Reemplaza con tu token real
      },
    });
    return response.data.employees; // Devuelve solo la lista de empleados
  }
);

export const deleteEmployeeById = createAsyncThunk(
  "employees/deleteEmployeeById",
  async (employeeId, { rejectWithValue }) => {
    console.log(employeeId);
    try {
      await axios.delete(`http://localhost:3000/employee/${employeeId}`, {
        headers: {
          "x-token": token,
        },
      });
      return employeeId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
