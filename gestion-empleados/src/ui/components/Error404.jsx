import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const Error404 = () => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  return (
    <section className="page_404">
      <div className="four_zero_four_bg">
        <h1>404</h1>
      </div>
      <div className="contant_box_404">
        <h3>La página que buscas no se encuentra disponible</h3>
        <p>Vuelve a la pantalla anterior</p>
        <Button onClick={onBack} variant="contained" color="secondary">
          Volver
        </Button>
      </div>
    </section>
  );
};
