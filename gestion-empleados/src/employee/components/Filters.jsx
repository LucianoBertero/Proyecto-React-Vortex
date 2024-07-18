import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const Filters = ({
  handleFilterByName,

  handleSortBySalary,
  handleClearFilters,
}) => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      marginBottom={2}
      minWidth={50}
      sx={{ maxWidth: "100%" }}
    >
      <Grid marginLeft={"20px"} item xs={12} sm={6} md={4}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Buscar por nombre o apellido"
          sx={{ width: "90%" }}
          onChange={(e) => handleFilterByName(e.target.value)}
        />
      </Grid>

      <Grid item xs={6} sm={3} md={2}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel>Ordenar por salario</InputLabel>
          <Select
            onChange={(e) => handleSortBySalary(e.target.value)}
            label="Ordenar por salario"
          >
            <MenuItem value="asc">Ascendente</MenuItem>
            <MenuItem value="desc">Descendente</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClearFilters}
        >
          Limpiar Filtros
        </Button>
      </Grid>
    </Grid>
  );
};

export default Filters;
