import React, { useState } from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { UserNewModal } from "./UserNewModal";
// import UserModal from "./UserModal"; // Asegúrate de tener el modal para agregar un usuario

const UserFilters = ({
  handleFilterByName,
  handleFilterByEmail,
  handleClearFilters,
}) => {
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [open, setOpen] = useState(false);

  const handleNameChange = (e) => {
    setNameFilter(e.target.value);
    handleFilterByName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmailFilter(e.target.value);
    handleFilterByEmail(e.target.value);
  };

  const handleClear = () => {
    setNameFilter("");
    setEmailFilter("");
    handleClearFilters();
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              placeholder="Buscar por email"
              fullWidth
              value={emailFilter}
              onChange={handleEmailChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
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

          <Grid item xs={12} sm={6} md={3}>
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
              Agregar Usuario
            </Button>
          </Grid>
        </Grid>
      </Box>

      <UserNewModal open={open} handleClose={handleClose} />
    </>
  );
};

export default UserFilters;
