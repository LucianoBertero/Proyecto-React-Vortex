import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchPositionsThunk = createAsyncThunk(
  "positions/fetchUsers",
  async ({ page = 1, limit = 10 }) => {
    let token = localStorage.getItem("authToken");
    const response = await axios.get("http://localhost:3000/position", {
      headers: {
        "x-token": token,
      },
      params: {
        limit,
        page,
      },
    });
    console.log(response.data.positions);
    return response.data.positions;
  }
);
