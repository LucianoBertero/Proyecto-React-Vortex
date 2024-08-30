import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { fetchPositions } from "../../services/positions.service";
import { createEmployee } from "../../services/employee.service";
import { fetchEmployees } from "../../store/slices/employee/employeeThunks";

const EmployeeModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    reset();
  }, [open, reset]);

  useEffect(() => {
    const getPositions = async () => {
      try {
        const positionsData = await fetchPositions();
        setPositions(positionsData);
      } catch (error) {
        console.error("Error al obtener posiciones:", error);
      }
    };
    getPositions();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await createEmployee(data);
      if (!response.ok) {
        handleClose();
        navigate("/employee/list");
        Swal.fire({
          title: "Error",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      handleClose();
      Swal.fire({
        title: "Empleado agregado",
        text: "El empleado ha sido agregado con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        reset();
        dispatch(fetchEmployees({ page: 1, limit: 10 }));
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Ha ocurrido un error al crear el empleado.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      reset();
      handleClose();
    }
  };

  const handleCloseAndReset = () => {
    reset();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Agregar Empleado</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            margin="dense"
            id="firstName"
            label="Nombre"
            type="text"
            fullWidth
            variant="outlined"
            {...register("firstName", { required: "Nombre es requerido" })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Apellido"
            type="text"
            fullWidth
            variant="outlined"
            {...register("lastName", { required: "Apellido es requerido" })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            margin="dense"
            id="email"
            label="Correo Electrónico"
            type="email"
            fullWidth
            variant="outlined"
            {...register("email", {
              required: "Correo Electrónico es requerido",
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="dense"
            id="phone"
            label="Número de Teléfono"
            type="tel"
            fullWidth
            variant="outlined"
            {...register("phone", {
              required: "Número de Teléfono es requerido",
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <TextField
            margin="dense"
            id="hireDate"
            label="Fecha de Contratación"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            {...register("hireDate", {
              required: "Fecha de Contratación es requerida",
            })}
            error={!!errors.hireDate}
            helperText={errors.hireDate?.message}
          />
          <TextField
            margin="dense"
            id="salary"
            label="Salario"
            type="number"
            fullWidth
            variant="outlined"
            {...register("salary", { required: "Salario es requerido" })}
            error={!!errors.salary}
            helperText={errors.salary?.message}
          />
          <TextField
            margin="dense"
            id="birthCity"
            label="Ciudad de Nacimiento"
            type="text"
            fullWidth
            variant="outlined"
            {...register("birthCity")}
          />
          <TextField
            margin="dense"
            id="department"
            label="Departamento"
            type="text"
            fullWidth
            variant="outlined"
            {...register("department")}
          />
          <Controller
            name="position"
            control={control}
            rules={{ required: "Posición es requerida" }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.position} margin="dense">
                <InputLabel>Seleccionar posición</InputLabel>
                <Select {...field} label="Seleccionar Posición">
                  <MenuItem value="">
                    <em>Ninguna</em>
                  </MenuItem>
                  {positions.map((pos) => (
                    <MenuItem key={pos.id} value={pos.name}>
                      {pos.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.position?.message}</FormHelperText>
              </FormControl>
            )}
          />
          <TextField
            margin="dense"
            id="supervisor"
            label="Supervisor"
            type="text"
            fullWidth
            variant="outlined"
            {...register("supervisor")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAndReset}>Cancelar</Button>
          <Button type="submit">Guardar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EmployeeModal;
