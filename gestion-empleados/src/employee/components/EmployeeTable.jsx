import React from "react";
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
  { id: "firstName", label: "Nombre", minWidth: 10 },
  { id: "lastName", label: "Apellido", minWidth: 20 },
  { id: "supervisor", label: "Supervisor", minWidth: 20 },
  { id: "position", label: "Posición", minWidth: 20 },
  { id: "isDeleted", label: "Status", minWidth: 10 },
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
  onDischargeEmployee,
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={`${row._id}-${column.id}`}
                        align={column.align}
                        sx={{
                          color:
                            column.id === "isDeleted"
                              ? value
                                ? "red"
                                : "green"
                              : "inherit",
                        }}
                      >
                        {column.id === "position" ? (
                          row.position.name
                        ) : column.id === "isDeleted" ? (
                          value ? (
                            "DeBaja"
                          ) : (
                            "Activo"
                          )
                        ) : column.id === "actions" ? (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              gap: 2,
                            }}
                          >
                            {row.isDeleted ? (
                              <Button
                                onClick={() => onDischargeEmployee(row._id)}
                                variant="contained"
                                color="success"
                              >
                                Dar de Alta
                              </Button>
                            ) : (
                              <Button
                                onClick={() => onDeleteEmployee(row._id)}
                                variant="contained"
                                color="error"
                              >
                                Eliminar
                              </Button>
                            )}
                            <Button
                              variant="contained"
                              onClick={() => viewEmployeeDetail(row._id)}
                            >
                              Ver más / Editar
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
