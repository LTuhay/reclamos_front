import React from "react";
import { useNavigate } from "react-router-dom";
import Boton from "./Boton";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return <Boton color="btn-success" label="Volver" onClick={handleBackClick} />;
};

export default BackButton;
