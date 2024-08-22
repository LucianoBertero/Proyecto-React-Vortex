import { useState } from "react";
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
import { useEffect } from "react";
import axios from "axios";

const Filters = ({
  handleFilterByName,
  handleSortBySalary,
  handleClearFilters,
}) => {
  const [nameFilter, setNameFilter] = useState("");
  const [salarySort, setSalarySort] = useState("");
  const [position, setPosition] = useState([]);

  console.log("hola");

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://localhost:3000/position`, {
          headers: {
            "x-token": token,
          },
        });
        setPosition(response.data.positions);
        console.log(position + "dasdasdasd");
        console.log(response);
      } catch (error) {}
    };
    fetchPositions();
  }, []);

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
        spacing={1}
        alignItems="center"
        justifyContent="center"
        marginBottom={2}
        minWidth={50}
        sx={{ maxWidth: "100%" }}
      >
        <Grid item xs={12} sm={3} md={3}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Buscar por nombre "
            sx={{ width: "100%" }}
            value={nameFilter}
            onChange={handleNameChange}
          />
        </Grid>

        <Grid item xs={12} sm={3} md={3}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Nombre Supervisor"
            sx={{ width: "100%" }}
            value={nameFilter}
            onChange={handleNameChange}
          />
        </Grid>

        <Grid item xs={12} sm={3} md={3}>
          <FormControl variant="outlined" size="small" sx={{ width: "100%" }}>
            <InputLabel>Seleccionar posicion</InputLabel>
            <Select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              label="Seleccionar Posicion"
            >
              {position.map((pos) => (
                <MenuItem key={pos.id} value={pos.name}>
                  {pos.name}
                </MenuItem>
              ))}
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
