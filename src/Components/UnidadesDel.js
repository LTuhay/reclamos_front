import React, { useContext } from "react";
import useAuth from "../hooks/useAuth";
import Boton from "./Boton";

const UnidadesDelButton = ({ idUnidad, onDeleteSuccess }) => {
  const { auth } = useAuth();

  const handleEliminarUnidad = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/unidades/delete?id=${idUnidad}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Unidad eliminada correctamente");
        onDeleteSuccess();
      } else {
        console.error("Error al eliminar unidad:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <Boton label="Eliminar" onClick={handleEliminarUnidad}></Boton>;
};

export default UnidadesDelButton;
