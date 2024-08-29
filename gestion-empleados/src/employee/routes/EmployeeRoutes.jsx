import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../../ui/components/Navbar";
import { EmployeeList } from "../pages/EmployeeList";
import { EmployeeDetail } from "../pages/EmployeeDetail";
import { UserList } from "../pages/UserList";
import { UserDetails } from "../pages/UserDetails";
import { PositionsList } from "../pages/PositionsList";

export const EmployeeRoutes = () => {
  return (
    <>
      <Navbar className="container"></Navbar>

      <Routes>
        <Route path="list" element={<EmployeeList />} />
        <Route path="users" element={<UserList />} />
        <Route path="positions" element={<PositionsList />} />
        <Route path="users/detail/:id" element={<UserDetails />} />
        <Route
          path="/*"
          element={<Navigate to="/employee/list"></Navigate>}
        ></Route>
        <Route path="detail/:id" element={<EmployeeDetail />} />
      </Routes>
    </>
  );
};
