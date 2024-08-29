import { configureStore } from "@reduxjs/toolkit";
import { employeesSlice } from "./slices/employee/employeesSlice";
import { userSlice } from "./slices/user/userSlice";
import { positionsSlice } from "./slices/position/positionSlice";
export const store = configureStore({
  reducer: {
    employees: employeesSlice.reducer,
    users: userSlice.reducer,
    positions: positionsSlice.reducer,
  },
});
