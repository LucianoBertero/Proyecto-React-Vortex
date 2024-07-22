// EmployeeModal.js
import React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EmployeeModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const castEmployee = {
      FIRST_NAME: data.firstName,
      LAST_NAME: data.lastName,
      EMAIL: data.email,
      PHONE_NUMBER: data.phoneNumber,
      HIRE_DATE: data.hireDate,
      SALARY: data.salary,
      BIRTH_CITY: data.birthCity,
      DEPARTMENT: data.department,
      POSITION: data.position,
      SUPERVISOR: data.supervisor,
    };

    dispatch({
      type: "employees/addEmployee",
      payload: castEmployee,
    });

    handleClose();

    Swal.fire({
      title: "Empleado agregado",
      text: "El empleado ha sido agregado con éxito.",
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      reset(
        (defaultValues = {
          salary: 0,
          phoneNumber: 0,
          birthCity: "",
          department: "",
          position: "",
          supervisor: "",
        })
      );
      navigate("/employee/list");
    });
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
            {...register("firstName", { required: true })}
            error={!!errors.firstName}
            helperText={errors.firstName ? "Nombre es requerido" : ""}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Apellido"
            type="text"
            fullWidth
            variant="outlined"
            {...register("lastName", { required: true })}
            error={!!errors.lastName}
            helperText={errors.lastName ? "Apellido es requerido" : ""}
          />
          <TextField
            margin="dense"
            id="email"
            label="Correo Electrónico"
            type="email"
            fullWidth
            variant="outlined"
            {...register("email", { required: true })}
            error={!!errors.email}
            helperText={errors.email ? "Correo Electrónico es requerido" : ""}
          />
          <TextField
            margin="dense"
            id="phoneNumber"
            label="Número de Teléfono"
            type="number"
            fullWidth
            variant="outlined"
            {...register("phoneNumber", { required: true })}
            error={!!errors.phoneNumber}
            helperText={
              errors.phoneNumber ? "Número de Teléfono es requerido" : ""
            }
          />
          <TextField
            margin="dense"
            id="hireDate"
            label="Fecha de Contratación"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            {...register("hireDate", { required: true })}
            error={!!errors.hireDate}
            helperText={
              errors.hireDate ? "Fecha de Contratación es requerida" : ""
            }
          />
          <TextField
            margin="dense"
            id="salary"
            label="Salario"
            type="number"
            fullWidth
            variant="outlined"
            {...register("salary", { required: true })}
            error={!!errors.salary}
            helperText={errors.salary ? "Salario es requerido" : ""}
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
          <TextField
            margin="dense"
            id="position"
            label="Posición"
            type="text"
            fullWidth
            variant="outlined"
            {...register("position")}
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
