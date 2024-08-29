import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { fetchRole } from "../../services/role.service";
import { updateUser } from "../../services/user.service";
import { Loader } from "../../ui/components/Loader";

export const UserDetails = () => {
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState([]);
  const [user, setUser] = useState({});
  const { control, setValue, handleSubmit, formState } = useForm({});
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const numericId = parseInt(id);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://localhost:3000/users/${id}`, {
          headers: {
            "x-token": token,
          },
        });

        const userData = response.data.user;

        setUser(userData);
        setUserRole(userData.role.name);

        setValue("firstName", userData.name);
        setValue("email", userData.email);
        setValue("role", userData.role.name);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        navigate("/employee/users", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [numericId, navigate, setValue]);

  useEffect(() => {
    const getRole = async () => {
      try {
        const positionsData = await fetchRole();
        setPositions(positionsData);
      } catch (error) {
        console.error("Error al obtener posiciones:", error);
      }
    };
    getRole();
  }, []);

  const onSubmit = async (data) => {
    if (!user) {
      console.error("El usuario no está definido");
      return;
    }
    if (!data.firstName || !data.email || !data.role) {
      Swal.fire("Error!", "Todos los campos son obligatorios.", "error");
      return;
    }

    const originalUser = {
      name: user.name || "",
      email: user.email || "",
      role: user.role?.name || "",
      password: "",
    };

    const changedData = {};
    if (data.firstName !== originalUser.name) {
      changedData.name = data.firstName;
    }
    if (data.email !== originalUser.email) {
      changedData.email = data.email;
    }
    if (data.role !== originalUser.role) {
      changedData.role = data.role;
    }
    if (data.password) {
      if (data.password.length < 6) {
        console.error("La contraseña debe tener al menos 6 caracteres");
        return;
      }
      changedData.password = data.password;
    }

    if (Object.keys(changedData).length > 0) {
      console.log(changedData);
      try {
        console.log(user);
        await updateUser({
          userId: user.uid,
          data: changedData,
        });
        Swal.fire(
          "Modificado!",
          "Los datos del usuario han sido actualizados.",
          "success"
        ).then(() => {
          navigate("/employee/users");
        });
      } catch (error) {
        console.error("Error al modificar el usuario:", error);
        Swal.fire("Error!", "No se pudo modificar el usuario.", "error");
      }
    } else {
      Swal.fire(
        "No hay cambios",
        "No se realizaron cambios en los datos.",
        "info"
      );
    }
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <Container sx={{ marginTop: "140px" }}>
      <Typography
        variant="h6"
        textAlign={"start"}
        marginBottom={2}
        marginLeft={4}
      >
        Detalle de usuario
      </Typography>
      <Card
        sx={{
          display: "flex",
          flexDirection: isMediumScreen ? "column" : "row",
          alignItems: "center",
          padding: 2,
          backgroundColor: "#E0E0E0",
          borderRadius: 16,
          mt: "4rem",
          margin: "2rem",
          boxShadow: 3,
        }}
      >
        {!isSmallScreen && (
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100%", md: 151 },
              borderRadius: "50%",
              maxWidth: 151,
              marginBottom: { xs: 2, md: 0 },
            }}
            image="/assets/dc-superman.jpg"
            alt={`photo perfil`}
          />
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            ml: { md: 2 },
            width: "100%",
          }}
        >
          <CardContent sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Nombre:
                  </Typography>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        size="small"
                        placeholder="Editar nombre"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Email:
                  </Typography>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: "El email es obligatorio" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        size="small"
                        placeholder="Editar email"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={
                          fieldState.error ? fieldState.error.message : ""
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Role:
                  </Typography>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={field.value || userRole}
                        onChange={(e) => {
                          setUserRole(e.target.value);
                          field.onChange(e);
                        }}
                      >
                        {positions.map((position) => (
                          <MenuItem key={position._id} value={position.name}>
                            {position.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Password:
                  </Typography>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ minLength: 6 }} // Validación mínima de longitud
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        type="password" // Asegúrate de que el tipo sea 'password'
                        size="small"
                        placeholder="Editar contraseña"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={
                          fieldState.error
                            ? "La contraseña debe tener al menos 6 caracteres"
                            : ""
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid
                  container
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                    <Grid item xs={12} md={6}>
                      <Button
                        onClick={() => {
                          navigate("/employee/users");
                        }}
                        variant="contained"
                        color="primary"
                        sx={{ mr: 2 }}
                      >
                        Volver
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        sx={{ mr: 2 }}
                        disabled={
                          !(Object.keys(formState.dirtyFields).length !== 0)
                        }
                      >
                        Modificar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
};
