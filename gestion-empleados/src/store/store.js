import { configureStore } from "@reduxjs/toolkit";
import { employeesSlice } from "./slices/employee/employeesSlice";
export const store = configureStore({
  reducer: {
    employees: employeesSlice.reducer,
  },
});
