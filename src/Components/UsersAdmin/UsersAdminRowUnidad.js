import { NavLink } from "react-router-dom";
import { useState } from "react";
import { RemoveUnidadUser } from "../../Services/UsersService";
import useAuth from "../../hooks/useAuth";
/* eslint-disable react/prop-types */
export const UsersAdminRowUnidad = ({
  id,
  key,
  estado,
  edificio_id,
  nro,
  piso,
  usernameRowSelected,
  handlerGetUnidadByUsername,
  setUnidades,
  initialUnidades,
}) => {
  const { auth } = useAuth();
  const handlerRemoveUnidadFromUser = async () => {
    const result = window.confirm("Confirma la desasignación de la unidad?");
    if (result) {
      const res = await RemoveUnidadUser(usernameRowSelected, auth);
      return res;
    }
  };
  return (
    <tr>
      <td>{id}</td>
      <td>{estado}</td>
      <td>{}</td>
      <td>{nro}</td>
      <td>{piso}</td>
      <td>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            handlerRemoveUnidadFromUser()
              .then(console.log("Unidad removida"))
              .then(() => {
                setUnidades(initialUnidades);
              });
          }}
        >
          Desasignar
        </button>
      </td>
    </tr>
  );
};
