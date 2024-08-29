import { Route, Routes } from "react-router-dom";
import { EmployeeRoutes } from "../employee/routes/EmployeeRoutes";
import { LoginPage } from "../auth/pages/LoginPage";
import { Error404 } from "../ui/components/Error404";
import {
  AuthenticatedRoute,
  ProtectedRoute,
} from "../components/ProtectedRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/employee/*"
        element={<ProtectedRoute element={<EmployeeRoutes />} />}
      />
      <Route
        path="/auth/login"
        element={<AuthenticatedRoute element={<LoginPage />} />}
      />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  );
};
