import { Box, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Loader } from "../../ui/components/Loader";
import { fetchPositionsThunk } from "../../store/slices/position/positionThunks";
import { PositionsTable } from "../components/PositionsTable";

export const PositionsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const positions = useSelector((state) => state.positions.positions);
  const status = useSelector((state) => state.positions.status);
  const error = useSelector((state) => state.positions.error);

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    dispatch(fetchPositionsThunk({ page, limit: rowsPerPage }));
    setRows(positions);
  }, [dispatch, page, rowsPerPage]);

  const onDeletePosition = (user) => {
    console.log(user);
    // Swal.fire({
    //   title: `¿Está seguro que desea eliminar a este usuario?`,
    //   showCancelButton: true,
    //   confirmButtonText: "Confirmar",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     deleteUser(user).then(() => {
    //       dispatch(fetchUsers({ page, limit: rowsPerPage }));
    //     });
    //   }
    // });
  };

  const viewPositionDetail = (userId) => {
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

          {positions.length === 0 && status === "succeeded" && (
            <Typography marginTop={20} textAlign={"center"}>
              <br />
              <br />
              <br />
              No hay usuarios registrados
            </Typography>
          )}

          {positions.length > 0 && (
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
                {/* <UserFilters
                  handleFilterByName={(value) =>
                    setFilters((prev) => ({ ...prev, name: value }))
                  }
                  handleFilterByEmail={(value) =>
                    setFilters((prev) => ({ ...prev, email: value }))
                  }
                  handleClearFilters={() => setFilters({ name: "", email: "" })}
                />{" "} */}
              </div>
              <div style={{ marginTop: "-70px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <PositionsTable
                    rows={rows}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    onDeletePosition={onDeletePosition}
                    viewPositionDetail={viewPositionDetail}
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
