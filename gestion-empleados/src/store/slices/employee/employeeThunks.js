import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const token = localStorage.getItem("authToken");

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async ({ page = 1, limit = 10 }) => {
    let token = localStorage.getItem("authToken");

    const response = await axios.get("http://localhost:3000/employee", {
      headers: {
        "x-token": token,
      },
      params: {
        limit,
        page,
      },
    });
    return response.data.employees;
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
