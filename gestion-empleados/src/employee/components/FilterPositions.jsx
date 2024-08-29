import React, { useState, useCallback } from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { PositionNewModal } from "./PositionNewModal";

const FilterPositions = ({ handleFilterByName }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [open, setOpen] = useState(false);

  const handleNameChange = useCallback(
    (e) => {
      setNameFilter(e.target.value);
      handleFilterByName(e.target.value);
    },
    [handleFilterByName]
  );

  const handleClear = useCallback(() => {
    setNameFilter("");
    handleFilterByName("");
  }, [handleFilterByName]);

  const handleClickOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <Box
        sx={{
          maxWidth: "60%",
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
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Buscar por nombre"
              fullWidth
              value={nameFilter}
              onChange={handleNameChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
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
                  Agregar Posición
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <PositionNewModal open={open} handleClose={handleClose} />
    </>
  );
};

export default FilterPositions;
