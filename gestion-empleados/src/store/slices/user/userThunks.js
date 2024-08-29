import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const token = localStorage.getItem("authToken");

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page = 1, limit = 10 }) => {
    const response = await axios.get("http://localhost:3000/users", {
      headers: {
        "x-token": token,
      },
      params: {
        limit,
        page,
      },
    });
    console.log(response.data.users);
    return response.data.users;
  }
);