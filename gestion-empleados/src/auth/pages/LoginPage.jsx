import React from "react";
import { LoginForm } from "../components/LoginForm";
import {
  Box,
  Grid,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import LogoVortex from "../components/Logo";
import { useLogin } from "../../hooks/useLogin";

export const LoginPage = () => {
  const { isLoading, handleSubmit } = useLogin();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", overflow: "hidden" }}>
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
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
          <LogoVortex />
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
            paddingTop: 8,
            minHeight: "100vh",
          }}
        >
          <LoginForm onLoginSubmit={handleSubmit} />
        </Grid>
      </Grid>
    </Box>
  );
};
