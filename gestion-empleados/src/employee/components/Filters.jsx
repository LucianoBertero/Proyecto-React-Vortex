import React, { useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import { green } from "@mui/material/colors";
import EmployeeModal from "./EmployeeModal";

const Filters = ({
  handleFilterByName,

  handleSortBySalary,
  handleClearFilters,
}) => {
  const [nameFilter, setNameFilter] = useState("");
  const [salarySort, setSalarySort] = useState("");
  const handleNameChange = (e) => {
    setNameFilter(e.target.value);
    handleFilterByName(e.target.value);
  };

  const handleSalaryChange = (e) => {
    setSalarySort(e.target.value);
    handleSortBySalary(e.target.value);
  };

  const handleClear = () => {
    setNameFilter("");
    setSalarySort("");
    handleClearFilters();
  };

  //Modal
  const [open, setOpen] = useState(false);

  // Función para abrir el modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid
        container
        spacing={1} // Reduce el espacio entre los elementos
        alignItems="center"
        justifyContent="center"
        marginBottom={2}
        minWidth={50}
        sx={{ maxWidth: "100%" }}
      >
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Buscar por nombre o apellido"
            sx={{ width: "100%" }}
            value={nameFilter}
            onChange={handleNameChange}
          />
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Ordenar por salario</InputLabel>
            <Select
              value={salarySort}
              onChange={handleSalaryChange}
              label="Ordenar por salario"
            >
              <MenuItem value="">Seleccione</MenuItem>
              <MenuItem value="asc">Ascendente</MenuItem>
              <MenuItem value="desc">Descendente</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <Button variant="contained" color="secondary" onClick={handleClear}>
            Limpiar Filtros
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          sx={{ textAlign: { xs: "center", sm: "right" } }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: green[500],
              color: "white",
              width: { xs: "100%", sm: "auto" },
            }}
            onClick={handleClickOpen}
          >
            Agregar Empleado
          </Button>
        </Grid>
      </Grid>
      <EmployeeModal open={open} handleClose={handleClose} />
    </>
  );
};

export default Filters;
