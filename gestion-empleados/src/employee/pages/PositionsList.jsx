import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Loader } from "../../ui/components/Loader";
import { fetchPositionsThunk } from "../../store/slices/position/positionThunks";
import { PositionsTable } from "../components/PositionsTable";
import FilterPositions from "../components/FilterPositions";
import { deletePositions } from "../../services/positions.service";

export const PositionsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const positions = useSelector((state) => state.positions.positions);
  const status = useSelector((state) => state.positions.status);
  const error = useSelector((state) => state.positions.error);
  //   console.log(positions);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    name: "",
  });

  const filterAndSortRows = () => {
    let filteredRows = [...positions];

    // Filtrado por nombre
    if (filters.name) {
      filteredRows = filteredRows.filter((position) =>
        position.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    console.log(filteredRows);

    setRows(filteredRows);
  };

  useEffect(() => {
    dispatch(fetchPositionsThunk({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    filterAndSortRows();
  }, [filters, positions]);

  const handleFilterByName = (name) => {
    setFilters((prevFilters) => ({ ...prevFilters, name }));
  };

  const onDeletePosition = async (position) => {
    console.log(position);
    Swal.fire({
      title: `¿Está seguro que desea eliminar esta posición?`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const responseDelete = await deletePositions(position);

          console.log(responseDelete);
          if (!responseDelete.ok) {
            Swal.fire({
              title: "Error",
              text:
                responseDelete.error.message ||
                "Ha ocurrido un error al eliminar la posición.",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          } else {
            Swal.fire({
              title: "Eliminado",
              text: "La posición ha sido eliminada exitosamente.",
              icon: "success",
              confirmButtonText: "Aceptar",
            }).then(() => {
              dispatch(fetchPositionsThunk({ page: page, limit: rowsPerPage }));
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error.message || "Ha ocurrido un error inesperado.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
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
        <Loader />
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
              No hay posiciones registradas
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
                  Lista de Posiciones
                </Typography>
                {/* Añade los filtros aquí */}
                <FilterPositions handleFilterByName={handleFilterByName} />
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
