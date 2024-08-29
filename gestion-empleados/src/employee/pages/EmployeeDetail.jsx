import React, { useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { updateEmployeeById } from "../../store/slices/employee/employeesSlice";
import { useState } from "react";

export const EmployeeDetail = () => {
  const [loading, setLoading] = useState(true);
  const { control, setValue, formState, handleSubmit } = useForm();
  const dispatch = useDispatch();
  let employee = {};

  const navigate = useNavigate();
  const { id } = useParams();
  const numericId = parseInt(id);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  //Encontrar el empleado por el id

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Reemplaza esto con tu lógica para obtener el token
        const response = await axios.get(
          `http://localhost:3000/employee/${id}`,
          {
            headers: {
              "x-token": token,
            },
          }
        );
        const employeeData = response.data.employee; // Asegúrate de que la respuesta tenga la estructura correcta
        // Establecer los valores en el formulario
        setValue("firstName", employeeData.firstName);
        setValue("id", employeeData._id);
        setValue("lastName", employeeData.lastName);
        setValue("email", employeeData.email);
        setValue("phoneNumber", employeeData.phoneNumber);
        setValue("hireDate", employeeData.hireDate.split("T")[0]);
        setValue("salary", employeeData.salary);
        setValue("birdCity", employeeData.birthCity);
        setValue("departament", employeeData.department);
        setValue("position", employeeData.position.name);
        setValue("supervisor", employeeData.supervisor);
      } catch (error) {
        console.error("Error al obtener el empleado:", error);
        navigate("/employee/list", { replace: true });
      } finally {
        setLoading(false); // Cambiar el estado de carga a false
      }
    };

    fetchEmployee();
  }, [numericId, navigate, setValue]);

  const onSubmit = (data) => {
    if (Object.keys(formState.dirtyFields).length === 0) {
    } else {
      Swal.fire({
        title: `¿Está seguro que desea modificar a ${employee.FIRST_NAME} ${employee.LAST_NAME}?`,
        showCancelButton: true,
        confirmButtonText: "Confirmar",
      }).then(async (result) => {
        // Cambiado a async
        if (result.isConfirmed) {
          const token = localStorage.getItem("authToken"); // Obtener el token

          console.log(data.id);
          console.log(data);
          //castear el objeto

          try {
            await axios.put(
              `http://localhost:3000/employee/updateEmployee/${data.id}`,
              data,
              {
                headers: {
                  "x-token": token,
                },
              }
            );

            Swal.fire("Modificado!", "", "success");
            navigate("/employee/list");
          } catch (error) {
            console.error("Error al modificar el empleado:", error);
            Swal.fire("Error!", "No se pudo modificar el empleado.", "error");
          }
        } else {
          // ... código existente para manejar la cancelación ...
        }
      });
    }
  };

  if (loading) {
    return (
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
    ); // Muestra un mensaje de carga
  }

  return (
    <>
      <Container sx={{ marginTop: "140px" }}>
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
              alt={`${employee?.firstName} ${employee?.LAST_NAME}`}
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
              {/* <form onSubmit={handleSubmit(onSubmit)}>
              <form onSubmit={handleSubmit(onSubmit)}>
               */}

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
                      Apellido:
                    </Typography>
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{ required: "El apellido es obligatorio" }} // Regla de validación
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          size="small"
                          placeholder="Editar apellido"
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
                      Correo Electrónico:
                    </Typography>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          size="small"
                          placeholder="Editar correo electrónico"
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
                      Número de Teléfono:
                    </Typography>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          size="small"
                          placeholder="Editar número de teléfono"
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
                      Fecha de Contratación:
                    </Typography>
                    <Controller
                      name="hireDate"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="date" // Cambiado a type date
                          variant="outlined"
                          size="small"
                          placeholder="Editar fecha de contratación"
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
                      Salario:
                    </Typography>
                    <Controller
                      name="salary"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          size="small"
                          type="number"
                          placeholder="Editar salario"
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
                      Lugar de nacimiento:
                    </Typography>
                    <Controller
                      name="birdCity"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text" // Cambiado a type date
                          variant="outlined"
                          size="small"
                          placeholder="Editar lugar de nacimiento"
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
                      Departamento:
                    </Typography>
                    <Controller
                      name="departament"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          size="small"
                          placeholder="Editar departamento"
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
                      Posicion:
                    </Typography>
                    <Controller
                      name="position"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          size="small"
                          placeholder="Editar Posicion"
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
                      Supervisor:
                    </Typography>
                    <Controller
                      name="supervisor"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          size="small"
                          placeholder="Editar Supervisor"
                          fullWidth
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
                            navigate("/employee/list");
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
    </>
  );
};
