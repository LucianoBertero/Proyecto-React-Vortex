import { Navigate, Route, Routes } from "react-router-dom";
import { EmployeeRoutes } from "../employee/routes/EmployeeRoutes";
import { LoginPage } from "../auth/pages/LoginPage";
import { Error404 } from "../ui/components/Error404";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/employee/*"
          element={<EmployeeRoutes></EmployeeRoutes>}
        ></Route>
        <Route path="/auth/*" element={<LoginPage></LoginPage>}></Route>
        <Route path="/*" element={<Error404></Error404>}></Route>
      </Routes>
    </>
  );
};
