import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { sendRecoveryEmail } from "../../services/auth.service";
// import { sendResetPasswordRequest } from "../../services/auth.service"; // Ajusta la ruta según corresponda

export const ForgotPasswordModal = ({ open, handleClose }) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      setErrors({ email: "Este campo es obligatorio" });
      return;
    }
    if (!validateEmail(email)) {
      setErrors({ email: "Ingrese un correo electrónico válido" });
      return;
    }
    handleClose();
    try {
      const response = await sendRecoveryEmail(email);

      if (response.ok === true) {
        Swal.fire({
          title: "Éxito",
          text: "Se ha enviado un correo de restablecimiento de contraseña.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        handleClose(); // Cierra el modal
      } else {
        Swal.fire({
          title: "Error",
          text:
            response.message ||
            "No se pudo enviar el correo de restablecimiento.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Ha ocurrido un error.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Restablecer Contraseña</DialogTitle>
      <form onSubmit={onSubmit} noValidate>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Ingresa tu correo electrónico para recibir instrucciones de
            restablecimiento de contraseña.
          </Typography>
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Enviar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
