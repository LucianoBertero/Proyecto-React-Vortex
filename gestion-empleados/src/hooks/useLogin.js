// hooks/useLogin.js
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { login } from "../services/auth.service";
export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (username, password) => {
    setIsLoading(true);
    setTimeout(() => {}, 10000);

    try {
      const data = await login(username, password);

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        navigate("/employee/list");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error de inicio de sesión",
          text: "El nombre de usuario o la contraseña son incorrectos.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error de inicio de sesión",
        text: "El nombre de usuario o la contraseña son incorrectos.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3085d6",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSubmit };
};
