import { Navigate, Route, Routes } from "react-router-dom";
import { EmployeeRoutes } from "../employee/routes/EmployeeRoutes";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/employee/*"
          element={<EmployeeRoutes></EmployeeRoutes>}
        ></Route>

        <Route path="/*" element=<Navigate to="/employee"></Navigate>></Route>
      </Routes>
    </>
  );
};
