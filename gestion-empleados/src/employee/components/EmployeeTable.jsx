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
} from "@mui/material";

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

const EmployeeTable = ({
  rows,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  onDeleteEmployee,
  viewEmployeeDetail,
}) => {
  return (
    <Paper sx={{ width: "85%" }}>
      <TableContainer sx={{ maxHeight: "100%" }}>
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
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.EMPLOYEE_ID}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "actions" ? (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              gap: 2,
                            }}
                          >
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
                              Ver mas / Editar
                            </Button>
                          </Box>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
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
  );
};

export default EmployeeTable;
