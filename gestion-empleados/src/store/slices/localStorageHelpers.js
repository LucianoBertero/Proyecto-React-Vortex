import { employeeDb } from "../../../public/data/employee";

export const saveEmployeesToLocalStorage = (employees) => {
  localStorage.setItem("employees", JSON.stringify(employees));
};

export const loadEmployeesFromLocalStorage = () => {
  const storedEmployees = localStorage.getItem("employees");
  return storedEmployees ? JSON.parse(storedEmployees) : null;
};

export const getInitialState = () => {
  const employees = loadEmployeesFromLocalStorage();
  if (employees) {
    return employees;
  } else {
    const initialEmployees = employeeDb;
    saveEmployeesToLocalStorage(initialEmployees);
    return initialEmployees;
  }
};
