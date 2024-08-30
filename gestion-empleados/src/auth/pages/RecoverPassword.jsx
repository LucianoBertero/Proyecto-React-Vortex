import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Importa useParams
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { recoverPass } from "../../services/auth.service";
import Swal from "sweetalert2";

const RecoverPassword = () => {
  const { token } = useParams(); // Extrae el token de los parámetros de la URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 5) {
      Swal.fire({
        title: "Error",
        text: "La contraseña debe tener al menos 5 caracteres",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await recoverPass(token, password);
      console.log(response);
      if (response.ok) {
        Swal.fire({
          title: "Éxito",
          text: "Contraseña actualizada exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          navigate("/auth/login");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.message || "No se pudo actualizar la contraseña",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Error al actualizar la contraseña",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Recuperar Contraseña</Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 8 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Nueva Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirm-password"
            label="Confirmar Contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Actualizar Contraseña"
            )}
          </Button>
          {message && (
            <Alert severity={message.startsWith("Error") ? "error" : "success"}>
              {message}
            </Alert>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default RecoverPassword;
