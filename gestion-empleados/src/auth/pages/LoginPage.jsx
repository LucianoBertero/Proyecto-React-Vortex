import React from "react";
import { LoginForm } from "../components/LoginForm";
import { Box, Grid, useTheme, useMediaQuery } from "@mui/material";

export const LoginPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", overflow: "hidden" }}>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            backgroundColor: "primary.main",
            minHeight: "100vh",
            display: isSmallScreen ? "none" : "block",
            overflow: "hidden",
            position: "relative",
          }}
          className="pattern-cross-dots-sm"
        >
          {/* Imagen de fondo */}
          <img
            src="../../../public/assets/pngegg3.png"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            alt="Imagen de fondo"
          />
          {/* Imagen centrada */}
          <img
            src="https://vortex-it.com/wp-content/uploads/2022/04/LOGO-VORTEX-PNG@4x-230x35.png"
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              height: "80px",
              width: "auto",
            }}
            alt="Vortex"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            backgroundColor: "white",
            paddingTop: 8, // Ajustar el valor para posicionar más arriba
            minHeight: "100vh",
          }}
        >
          <LoginForm />
        </Grid>
      </Grid>
    </Box>
  );
};
