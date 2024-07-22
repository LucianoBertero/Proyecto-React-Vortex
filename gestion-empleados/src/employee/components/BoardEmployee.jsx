import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeeTable from "./EmployeeTable";
import Filters from "./Filters";
import { deleteEmployeeById } from "../../store/slices/employee/employeesSlice";
import Swal from "sweetalert2/dist/sweetalert2.js";

export const BoardEmployee = () => {
  const { employees } = useSelector((state) => state.employees);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    name: "",
    sortDate: "",
    sortSalary: "",
  });

  useEffect(() => {
    setRows(employees);
  }, [employees]);

  if (employees === undefined || employees.length === 0 || employees === null) {
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
      title: `¿Está seguro que desea eliminar a ${employee.FIRST_NAME} ${employee.LAST_NAME}?`,

      showCancelButton: true,
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        const { EMPLOYEE_ID } = employee;
        dispatch(deleteEmployeeById(EMPLOYEE_ID));
        Swal.fire("Eliminado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const viewEmployeeDetail = (row) => {
    navigate(`/employee/detail/${row.EMPLOYEE_ID}`, { replace: true });
  };

  //FILTROS

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

  useEffect(() => {
    filterAndSortRows();
  }, [filters]);

  const filterAndSortRows = () => {
    let filteredRows = [...employees];

    if (filters.name) {
      filteredRows = filteredRows.filter((employee) =>
        `${employee.FIRST_NAME} ${employee.LAST_NAME}`
          .toLowerCase()
          .includes(filters.name.toLowerCase())
      );
    }

    if (filters.sortSalary) {
      filteredRows.sort((a, b) => {
        return filters.sortSalary === "asc"
          ? a.SALARY - b.SALARY
          : b.SALARY - a.SALARY;
      });
    }

    setRows(filteredRows);
  };
  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
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
