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
import { fetchRole } from "../../services/role.service";
import { registerUser } from "../../services/user.service";

export const UserNewModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const [role, setRole] = useState([]);

  useEffect(() => {
    if (open) {
      reset(); // Resetear el formulario solo cuando el modal se abre
    }
  }, [open, reset]);

  useEffect(() => {
    const getRole = async () => {
      try {
        const roleData = await fetchRole();
        setRole(roleData);
      } catch (error) {
        console.log("Error al obtener los roles", error);
      }
    };

    getRole();
  }, []);

  const onSubmit = async (data) => {
    try {
      // Lógica para crear el empleado

      console.log(data);

      const registerUserResponse = await registerUser({ data });

      if (registerUserResponse.ok === false) {
        Swal.fire({
          title: "Error",
          text:
            registerUserResponse.error.message ||
            "Ha ocurrido un error al crear el empleado.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }

      handleClose();
      Swal.fire({
        title: "Empleado agregado",
        text: "El empleado ha sido agregado con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        reset();
        navigate("/employee/users");
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

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Agregar Usuario</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            margin="dense"
            id="user"
            label="Nombre"
            type="text"
            fullWidth
            variant="outlined"
            {...register("user", { required: "Nombre es requerido" })}
            error={!!errors.user}
            helperText={errors.user?.message}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="text"
            fullWidth
            variant="outlined"
            {...register("email", { required: "Email es requerido" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="dense"
            id="password"
            label="Contraseña"
            type="password"
            fullWidth
            variant="outlined"
            {...register("password", {
              required: "La contraseña es requerida",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Controller
            name="role"
            control={control}
            rules={{ required: "Rol es requerido" }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.role} margin="dense">
                <InputLabel>Seleccionar Rol</InputLabel>
                <Select {...field} label="Seleccionar Rol">
                  {role.map((rol) => (
                    <MenuItem key={rol._id} value={rol.name}>
                      {rol.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.role?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Guardar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
