// EdificioVerButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../Boton";
import { UpdateUnidadUser } from "../../Services/UsersService.js";
import useAuth from "../../hooks/useAuth.js";

const ButtonAsignarUnidad = ({ id_unidad, username }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const handleClick = async () => {
    let response = await UpdateUnidadUser(username, id_unidad, auth);
    return response;
  };

  return (
    <Boton
      label="Asignar"
      onClick={() =>
        handleClick().then((res) => {
          if (res) {
            alert("Usuario actualizado");
            navigate("/usuarios");
          } else {
            alert("La unidad no pudo ser asignada");
          }
        })
      }
    ></Boton>
  );
};

export default ButtonAsignarUnidad;
