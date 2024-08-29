import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeeTable from "./EmployeeTable";
import Filters from "./Filters";
import { deleteEmployeeById } from "../../store/slices/employee/employeeThunks";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { fetchEmployees } from "../../store/slices/employee/employeeThunks";
import {
  deleteEmployee,
  dischargeEmployee,
} from "../../services/employee.service";

export const BoardEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employees = useSelector((state) => state.employees.employees);
  const status = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filters, setFilters] = useState({
    name: "",
    supervisor: "",
    position: "",
  });

  useEffect(() => {
    dispatch(fetchEmployees({ page: page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    setRows(employees);
  }, [employees]);

  useEffect(() => {
    filterAndSortRows();
  }, [filters, employees]);

  const filterAndSortRows = () => {
    let filteredRows = [...employees];

    if (filters.name) {
      filteredRows = filteredRows.filter((employee) =>
        `${employee.firstName} ${employee.lastName}`
          .toLowerCase()
          .includes(filters.name.toLowerCase())
      );
    }

    if (filters.supervisor) {
      filteredRows = filteredRows.filter((employee) =>
        `${employee.supervisor}`
          .toLowerCase()
          .includes(filters.supervisor.toLowerCase())
      );
    }

    if (filters.position) {
      filteredRows = filteredRows.filter(
        (employee) =>
          `${employee.position.name}`.toLowerCase() ===
          filters.position.toLowerCase() // Cambiado a comparación exacta
      );
    }
    setRows(filteredRows);
  };

  //carga inicial

  if (status === "loading") {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Typography marginTop={20} textAlign={"center"}>
        Error: {error}
      </Typography>
    );
  }

  if (employees.length === 0) {
    return (
      <Typography marginTop={20} textAlign={"center"}>
        No hay empleados registrados
      </Typography>
    );
  }

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //TODO - AL dar de baja el la tabla no se renderiza

  const onDeleteEmployee = (employee) => {
    Swal.fire({
      title: `¿Está seguro que desea eliminar a este empleado?`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(employee).then(() => {
          dispatch(fetchEmployees({ page: page, limit: rowsPerPage }));
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };
  const onDischargeEmployee = (employee) => {
    Swal.fire({
      title: `¿Está seguro que desea dar de alta a este empleado?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dischargeEmployee(employee).then(() => {
          dispatch(fetchEmployees({ page: page, limit: rowsPerPage }));
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const viewEmployeeDetail = (row) => {
    navigate(`/employee/detail/${row}`, { replace: true });
  };

  // FILTROS
  const handleFilterByName = (value) => {
    setFilters({ ...filters, name: value });
  };

  const handleNameSupervisor = (value) => {
    setFilters({ ...filters, supervisor: value });
  };

  const handlePosition = (value) => {
    console.log(value);
    setFilters({ ...filters, position: value });
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      supervisor: "",
      position: "",
    });
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />

      <Filters
        handleFilterByName={handleFilterByName}
        handleNameSupervisor={handleNameSupervisor}
        handlePosition={handlePosition}
        handleClearFilters={handleClearFilters}
      />
      <br />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <EmployeeTable
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          onDeleteEmployee={onDeleteEmployee}
          viewEmployeeDetail={viewEmployeeDetail}
          onDischargeEmployee={onDischargeEmployee}
        />
      </Box>
    </>
  );
};
