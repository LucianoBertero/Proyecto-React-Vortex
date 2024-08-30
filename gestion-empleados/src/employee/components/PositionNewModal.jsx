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
import Swal from "sweetalert2";
import { createPosition } from "../../services/positions.service";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux"; // Importar useDispatch
import { fetchPositionsThunk } from "../../store/slices/position/positionThunks";

export const PositionNewModal = ({ open, handleClose, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Definir dispatch

  const onSubmit = async (data) => {
    if (!data.name) {
      Swal.fire({
        title: "Error",
        text: "El nombre es requerido",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    try {
      const responseNewPosition = await createPosition(data.name);
      if (responseNewPosition.ok === false) {
        Swal.fire({
          title: "Error",
          text:
            responseNewPosition.error.message ||
            "Ha ocurrido un error al crear la posición.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      handleClose();
      Swal.fire({
        title: "Posición agregada",
        text: "La posición ha sido agregada con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        dispatch(fetchPositionsThunk({ page: 1, limit: 10 }));
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Ha ocurrido un error al agregar la posición.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      reset();
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Agregar Posición</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
            variant="outlined"
            {...register("name", { required: "El nombre es requerido" })}
            error={!!errors.name}
            helperText={errors.name?.message}
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
