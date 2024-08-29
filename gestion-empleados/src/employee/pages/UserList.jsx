import { Box, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { fetchUsers } from "../../store/slices/user/userThunks";
import UserTable from "../components/UserTable";
import UserFilters from "../components/UserFIlter";
import { deleteUser, dischargeUser } from "../../services/user.service";
import { Loader } from "../../ui/components/Loader";

export const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
  });

  const filterAndSortRows = () => {
    let filteredRows = [...users];

    // Filtrado por nombre
    if (filters.name) {
      filteredRows = filteredRows.filter((user) =>
        user.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Filtrado por email
    if (filters.email) {
      filteredRows = filteredRows.filter((user) =>
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    setRows(filteredRows);
  };

  useEffect(() => {
    dispatch(fetchUsers({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    filterAndSortRows();
  }, [filters, users]);

  const onDeleteUser = (user) => {
    console.log(user);
    Swal.fire({
      title: `¿Está seguro que desea eliminar a este usuario?`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user).then(() => {
          dispatch(fetchUsers({ page, limit: rowsPerPage }));
        });
      }
    });
  };

  const onDischargeUser = (user) => {
    Swal.fire({
      title: `¿Está seguro que desea dar de alta a este empleado?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dischargeUser(user).then(() => {
          dispatch(fetchUsers({ page: page, limit: rowsPerPage }));
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const viewUserDetail = (userId) => {
    navigate(`/employee/users/detail/${userId}`, { replace: true });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {status === "loading" ? (
        <Loader> </Loader>
      ) : (
        <>
          {status === "failed" && (
            <Typography marginTop={20} textAlign={"center"}>
              <br />
              <br />
              <br />
              Error: {error}
            </Typography>
          )}

          {users.length === 0 && status === "succeeded" && (
            <Typography marginTop={20} textAlign={"center"}>
              <br />
              <br />
              <br />
              No hay usuarios registrados
            </Typography>
          )}

          {users.length > 0 && (
            <>
              <div style={{ margin: "77px 0" }}>
                <Typography
                  variant="h6"
                  textAlign={"start"}
                  marginBottom={2}
                  marginLeft={4}
                >
                  Lista de Usuarios
                </Typography>
                <UserFilters
                  handleFilterByName={(value) =>
                    setFilters((prev) => ({ ...prev, name: value }))
                  }
                  handleFilterByEmail={(value) =>
                    setFilters((prev) => ({ ...prev, email: value }))
                  }
                  handleClearFilters={() => setFilters({ name: "", email: "" })}
                />{" "}
              </div>
              <div style={{ marginTop: "-70px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <UserTable
                    rows={rows}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    onDeleteUser={onDeleteUser}
                    viewUserDetail={viewUserDetail}
                    onDischargeUser={onDischargeUser}
                  />
                </Box>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
