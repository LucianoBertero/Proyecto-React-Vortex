import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const LoginForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        "& .MuiTextField-root": { m: 1, width: "90%" },
        padding: 2,
      }}
    >
      <AccountCircleIcon sx={{ fontSize: 50 }} />
      <Typography variant="h4" gutterBottom>
        Iniciar Sesion
      </Typography>
      <TextField
        label="Usuario/Email"
        variant="outlined"
        fullWidth
        {...register("username")}
      />
      <TextField
        label="Contraseña"
        type="password"
        variant="outlined"
        fullWidth
        {...register("password")}
      />
      <FormControlLabel
        control={<Checkbox {...register("rememberMe")} />}
        label="Recordarme"
        sx={{ alignSelf: "flex-start", ml: 1 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, width: "90%" }}
      >
        Iniciar sesión
      </Button>
      <Box
        sx={{
          display: "flex",
          width: "90%",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Link href="#" variant="body2">
          Olvidé mi contraseña
        </Link>
        <Link href="#" variant="body2">
          Crear cuenta
        </Link>
      </Box>
    </Box>
  );
};