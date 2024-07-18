import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../../ui/components/Navbar";
import { EmployeeList } from "../pages/EmployeeList";
import { EmployeeDetail } from "../pages/EmployeeDetail";

export const EmployeeRoutes = () => {
  return (
    <>
      <Navbar className="container"></Navbar>

      <Routes>
        <Route path="list" element={<EmployeeList />} />
        <Route
          path="/*"
          element={<Navigate to="/employee/list"></Navigate>}
        ></Route>
        <Route path="detail/:id" element={<EmployeeDetail />} />
      </Routes>
    </>
  );
};
