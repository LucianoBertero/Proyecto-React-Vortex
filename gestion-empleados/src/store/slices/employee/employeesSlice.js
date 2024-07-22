import { createSlice } from "@reduxjs/toolkit";
import {
  getInitialState,
  saveEmployeesToLocalStorage,
} from "../localStorageHelpers";

export const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: getInitialState(),
  },
  reducers: {
    deleteEmployeeById: (state, action) => {
      const id = action.payload;
      state.employees = state.employees.filter((emp) => emp.EMPLOYEE_ID !== id);
      saveEmployeesToLocalStorage(state.employees);
    },
    updateEmployeeById: (state, action) => {
      const { id, updatedEmployee } = action.payload;
      const index = state.employees.findIndex((emp) => emp.EMPLOYEE_ID === id);
      if (index !== -1) {
        state.employees[index] = {
          ...state.employees[index],
          ...updatedEmployee,
        };
        saveEmployeesToLocalStorage(state.employees);
      }
    },
    addEmployee: (state, action) => {
      const lastId =
        state.employees.length > 0
          ? Math.max(...state.employees.map((employee) => employee.EMPLOYEE_ID))
          : 0;
      const newEmployee = { ...action.payload, EMPLOYEE_ID: lastId + 1 };
      state.employees.push(newEmployee);
      saveEmployeesToLocalStorage(state.employees);
    },
  },
});

export const { deleteEmployeeById, updateEmployeeById } =
  employeesSlice.actions;
