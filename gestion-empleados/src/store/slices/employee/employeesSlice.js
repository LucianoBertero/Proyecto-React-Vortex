import { createSlice } from "@reduxjs/toolkit";
import { employeeDb } from "../../../../public/data/employee";

const initialState = () => {
  const storedEmployees = localStorage.getItem("employees");

  if (storedEmployees) {
    return JSON.parse(storedEmployees);
  } else {
    const initialEmployees = employeeDb;
    localStorage.setItem("employees", JSON.stringify(initialEmployees));
    return initialEmployees;
  }
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: initialState(),
  },
  reducers: {
    // editEmpoyee: (state /* action */) => {},
    deleteEmployeeById: (state, action) => {
      const id = action.payload;
      state.employees = state.employees.filter((emp) => emp.EMPLOYEE_ID !== id);
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },
  },
  getEmployeeById: (state, action) => {
    // console.log("entro por lo menos");
    // const { id } = action.payload;
    // return state.employees.find((emp) => emp.EMPLOYEE_ID === id);
  },
});

export const { deleteEmployeeById } = employeesSlice.actions;
