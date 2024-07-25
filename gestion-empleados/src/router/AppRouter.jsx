import { Navigate, Route, Routes } from "react-router-dom";
import { EmployeeRoutes } from "../employee/routes/EmployeeRoutes";
import { LoginPage } from "../auth/pages/LoginPage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/employee/*"
          element={<EmployeeRoutes></EmployeeRoutes>}
        ></Route>
        <Route path="/auth/*" element={<LoginPage></LoginPage>}></Route>
        <Route path="/*" element=<Navigate to="/employee"></Navigate>></Route>
      </Routes>
    </>
  );
};
