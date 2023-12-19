// EdificioVerButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../Boton";

const ButtonVerUnidades = ({ id, direccion, username }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const dataNavigate = {
      state: { username },
    };
    navigate(
      `/usersaddunidades/${id}/${encodeURIComponent(direccion)}`,
      dataNavigate
    );
  };

  return (
    <Boton label="Ver unidades" onClick={handleClick}>
      Ver
    </Boton>
  );
};

export default ButtonVerUnidades;
