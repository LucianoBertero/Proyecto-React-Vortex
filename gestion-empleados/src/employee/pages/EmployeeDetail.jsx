import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

export const EmployeeDetail = () => {
  const { employees } = useSelector((state) => state.employees);
  const navigate = useNavigate();
  const { id } = useParams();
  const numericId = parseInt(id);

  let employee = null;

  for (let i = 0; i < employees.length; i++) {
    if (employees[i].EMPLOYEE_ID === numericId) {
      employee = employees[i];
      break;
    }
  }

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { control, handleSubmit, setValue, formState } = useForm({
    defaultValues: {
      firstName: employee?.FIRST_NAME || "",
      lastName: employee?.LAST_NAME || "",
      email: employee?.EMAIL || "",
      phoneNumber: employee?.PHONE_NUMBER || "",
      hireDate: employee?.HIRE_DATE || "",
      salary: employee?.SALARY || "",
    },
  });

  const onSubmit = (data) => {
    console.log(data); // Muestra los datos actualizados en la consola
    console.log(formState.touchedFields);
    if (Object.keys(formState.touchedFields).length !== 0) {
      console.log("no se ha tocado ningún campo");
    } else {
      console.log("al menos un campo ha sido tocado");
    }
  };

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
              alt={`${employee?.FIRST_NAME} ${employee?.LAST_NAME}`}
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
                      Apellido:
                    </Typography>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          size="small"
                          placeholder="Editar apellido"
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
                          variant="outlined"
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
                          placeholder="Editar salario"
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
                          type="submit" // Añadido para enviar el formulario
                          variant="contained"
                          color="secondary"
                          sx={{ mr: 2 }}
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
