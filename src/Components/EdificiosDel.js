import React, { useContext } from "react";
import useAuth from "../hooks/useAuth";
import Boton from "./Boton";

const EdificioEliminarButton = ({ direccion, onDeleteSuccess }) => {
  const { auth } = useAuth();

  const handleEliminarEdificio = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/edificios/delete?address=${encodeURIComponent(
          direccion
        )}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Edificio eliminado correctamente");
        onDeleteSuccess();
      } else {
        console.error("Error al eliminar el edificio:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <Boton label="Eliminar" onClick={handleEliminarEdificio}></Boton>;
};

export default EdificioEliminarButton;
