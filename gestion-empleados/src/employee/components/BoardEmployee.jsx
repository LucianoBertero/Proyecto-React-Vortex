import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "./Filters";
import { deleteEmployeeById } from "../../store/slices/employee/employeesSlice";
import Swal from "sweetalert2/dist/sweetalert2.js";

const columns = [
  { id: "EMPLOYEE_ID", label: "ID", minWidth: 10 },
  { id: "FIRST_NAME", label: "Nombre", minWidth: 20 },
  { id: "LAST_NAME", label: "Apellido", minWidth: 20 },
  { id: "EMAIL", label: "Email", minWidth: 70 },
  { id: "PHONE_NUMBER", label: "Teléfono", minWidth: 70 },
  { id: "HIRE_DATE", label: "Fecha de Contratación", minWidth: 70 },
  { id: "SALARY", label: "Salario", minWidth: 70 },
  { id: "actions", label: "Acciones", minWidth: 150, align: "center" },
];

//componente
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

  console.log(employees);
  if (employees === undefined) {
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
        //LOGIC TO DELETE EMPLOYEE

        const { EMPLOYEE_ID } = employee;
        console.log(EMPLOYEE_ID);

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

    if (filters.sortDate) {
      filteredRows.sort((a, b) => {
        const dateA = new Date(a.HIRE_DATE);
        const dateB = new Date(b.HIRE_DATE);
        return filters.sortDate === "asc" ? dateA - dateB : dateB - dateA;
      });
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
        <Paper sx={{ width: "85%" }}>
          <TableContainer sx={{ maxHeight: " 100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* Cuerpo */}
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "actions" ? (
                                <Box
                                  key={column.label}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 2,
                                  }}
                                >
                                  <Button variant="contained">Editar</Button>
                                  <Button
                                    onClick={() => onDeleteEmployee(row)}
                                    variant="contained"
                                    color="error"
                                  >
                                    Eliminar
                                  </Button>
                                  <Button
                                    variant="contained"
                                    onClick={() => viewEmployeeDetail(row)}
                                  >
                                    Ver mas
                                  </Button>
                                </Box>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};
