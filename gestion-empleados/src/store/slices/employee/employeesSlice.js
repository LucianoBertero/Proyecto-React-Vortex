import { createSlice } from "@reduxjs/toolkit";
import { saveEmployeesToLocalStorage } from "../localStorageHelpers";

import { fetchEmployees } from "./employeeThunks";

export const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // deleteEmployeeById: (state, action) => {
    //   const id = action.payload;
    //   state.employees = state.employees.filter((emp) => emp.EMPLOYEE_ID !== id);
    //   saveEmployeesToLocalStorage(state.employees);
    // },
    // updateEmployeeById: (state, action) => {
    //   const { id, updatedEmployee } = action.payload;
    //   const index = state.employees.findIndex((emp) => emp.EMPLOYEE_ID === id);
    //   if (index !== -1) {
    //     state.employees[index] = {
    //       ...state.employees[index],
    //       ...updatedEmployee,
    //     };
    //     saveEmployeesToLocalStorage(state.employees);
    //   }
    // },
    // addEmployee: (state, action) => {
    //   const lastId =
    //     state.employees.length > 0
    //       ? Math.max(...state.employees.map((employee) => employee.EMPLOYEE_ID))
    //       : 0;
    //   const newEmployee = { ...action.payload, EMPLOYEE_ID: lastId + 1 };
    //   state.employees.push(newEmployee);
    //   saveEmployeesToLocalStorage(state.employees);
    // },
    // setEmployees: (state, action) => {
    //   state.employees = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload; // Asigna los empleados obtenidos
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { deleteEmployeeById, updateEmployeeById } =
  employeesSlice.actions;
