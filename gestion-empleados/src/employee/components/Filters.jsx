import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";

import { green } from "@mui/material/colors";
import EmployeeModal from "./EmployeeModal";
import { fetchPositions } from "../../services/positions.service";

const Filters = ({
  handleFilterByName,
  handleNameSupervisor,
  handlePosition,
  handleClearFilters,
}) => {
  const [nameFilter, setNameFilter] = useState("");
  const [nameSupervisor, setNameSupervisor] = useState("");
  const [positionValue, setPositionValue] = useState("");
  const [positions, setPositions] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getPositions = async () => {
      try {
        const positionsData = await fetchPositions();
        setPositions(positionsData);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };
    getPositions();
  }, []);

  const handleNameChange = useCallback(
    (e) => {
      setNameFilter(e.target.value);
      handleFilterByName(e.target.value);
    },
    [handleFilterByName]
  );

  const handleNameSupervisorChange = useCallback(
    (e) => {
      setNameSupervisor(e.target.value);
      handleNameSupervisor(e.target.value);
    },
    [handleNameSupervisor]
  );

  const handlePositionChange = useCallback(
    (e) => {
      setPositionValue(e.target.value);
      handlePosition(e.target.value);
    },
    [handlePosition]
  );

  const handleClear = useCallback(() => {
    setNameFilter("");
    setNameSupervisor("");
    setPositionValue("");
    handleClearFilters();
  }, [handleClearFilters]);

  const handleClickOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <Box
        sx={{
          maxWidth: "80%",
          margin: "0 auto",
          padding: 2,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ marginBottom: 2 }}>
          <Typography
            variant="h6"
            sx={{ borderBottom: "2px solid #ddd", paddingBottom: 1 }}
          >
            Filtros
          </Typography>
        </Box>

        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Buscar por nombre"
              fullWidth
              value={nameFilter}
              onChange={handleNameChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Nombre Supervisor"
              fullWidth
              value={nameSupervisor}
              onChange={handleNameSupervisorChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>Seleccionar posición</InputLabel>
              <Select
                value={positionValue}
                onChange={handlePositionChange}
                label="Seleccionar Posición"
              >
                <MenuItem value="">Ninguna</MenuItem>
                {positions.map((pos) => (
                  <MenuItem key={pos._id} value={pos.name}>
                    {pos.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handleClear}
                  sx={{ height: "100%" }}
                >
                  Limpiar Filtros
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: green[500],
                    color: "white",
                    width: "100%",
                    height: "100%",
                    textTransform: "none",
                  }}
                  onClick={handleClickOpen}
                >
                  Agregar Empleado
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <EmployeeModal open={open} handleClose={handleClose} />
    </>
  );
};

export default Filters;
