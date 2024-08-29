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
  { id: "name", label: "Nombre", minWidth: 20 },
  { id: "email", label: "Email", minWidth: 20 },
  { id: "role", label: "Rol", minWidth: 20 },
  { id: "isDeleted", label: "Status", minWidth: 10 },
  { id: "actions", label: "Acciones", minWidth: 150, align: "center" },
];

const UserTable = ({
  rows,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  onDeleteUser,
  viewUserDetail,
  onDischargeUser,
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.uid}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={`${row.uid}-${column.id}`}
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
                        {column.id === "role" ? (
                          row.role.name
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
                                onClick={() => onDischargeUser(row.uid)}
                                variant="contained"
                                color="success"
                              >
                                Dar de Alta
                              </Button>
                            ) : (
                              <Button
                                onClick={() => onDeleteUser(row.uid)}
                                variant="contained"
                                color="error"
                              >
                                Eliminar
                              </Button>
                            )}
                            <Button
                              variant="contained"
                              onClick={() => viewUserDetail(row.uid)}
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

export default UserTable;
