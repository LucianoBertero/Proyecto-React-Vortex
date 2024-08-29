import { createSlice } from "@reduxjs/toolkit";

import { fetchPositionsThunk } from "./positionThunks";

export const positionsSlice = createSlice({
  name: "positions",
  initialState: {
    positions: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPositionsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPositionsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.positions = action.payload;
      })
      .addCase(fetchPositionsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.positions = action.payload;
      });
  },
});
