import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeeTable from "./EmployeeTable";
import Filters from "./Filters";
import { deleteEmployeeById } from "../../store/slices/employee/employeeThunks";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { fetchEmployees } from "../../store/slices/employee/employeeThunks";

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
    sortDate: "",
    sortSalary: "",
  });

  useEffect(() => {
    dispatch(fetchEmployees()); // Llama al thunk para obtener empleados
  }, [dispatch]);

  useEffect(() => {
    setRows(employees);
  }, [employees]);

  if (status === "loading") {
    return (
      <Typography marginTop={20} textAlign={"center"}>
        Cargando...
      </Typography>
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
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDeleteEmployee = (employee) => {
    Swal.fire({
      title: `¿Está seguro que desea eliminar a ${employee.firstName} ${employee.lastName}?`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEmployeeById(employee));
        dispatch(fetchEmployees());
        Swal.fire("Eliminado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const viewEmployeeDetail = (row) => {
    console.log(row);
    navigate(`/employee/detail/${row}`, { replace: true });
  };

  // FILTROS
  const handleFilterByName = (value) => {
    setFilters({ ...filters, name: value });
  };

  const handleSortBySalary = (value) => {
    setFilters({ ...filters, sortSalary: value });
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      sortDate: "",
      sortSalary: "",
    });
  };

  // useEffect(() => {
  //   filterAndSortRows();
  // }, [filters]);

  // const filterAndSortRows = () => {
  //   let filteredRows = [...employees];

  //   if (filters.name) {
  //     filteredRows = filteredRows.filter((employee) =>
  //       `${employee.firstName} ${employee.lastName}`
  //         .toLowerCase()
  //         .includes(filters.name.toLowerCase())
  //     );
  //   }

  //   if (filters.sortSalary) {
  //     filteredRows.sort((a, b) => {
  //       return filters.sortSalary === "asc"
  //         ? a.salary - b.salary
  //         : b.salary - a.salary;
  //     });
  //   }

  //   setRows(filteredRows);
  // };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <Filters
        handleFilterByName={handleFilterByName}
        handleSortBySalary={handleSortBySalary}
        handleClearFilters={handleClearFilters}
      />
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
        />
      </Box>
    </>
  );
};
