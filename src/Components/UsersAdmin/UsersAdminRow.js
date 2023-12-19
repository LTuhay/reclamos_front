import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

/* eslint-disable react/prop-types */
export const UsersAdminRow = ({
  nombre,
  dni,
  edad,
  username,
  email,
  tipoPersona,
  handlerUserSelectedForm,
  setPassForm,
  index,
  selectedRow,
  handleRowClick,
}) => {
  return (
    <tr
      key={index}
      onClick={() => {
        const table = document.getElementById("users-table");
        const rows = table.getElementsByTagName("tr");
        const username =
          rows[index + 1].getElementsByTagName("td")[4].innerHTML;
        const tipoPersona =
          rows[index + 1].getElementsByTagName("td")[3].innerHTML;
        handleRowClick(index, username, tipoPersona);
      }}
      className={selectedRow === index ? "table-success" : ""}
    >
      <td>{dni}</td>
      <td>{nombre}</td>
      <td>{edad}</td>
      <td>{tipoPersona}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            setPassForm(false);
            handlerUserSelectedForm({
              nombre,
              dni,
              edad,
              username,
              email,
              tipoPersona,
            });
          }}
        >
          Modificar
        </button>
      </td>

      <td>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => {
            setPassForm(false);
            handlerUserSelectedForm(
              {
                nombre,
                dni,
                edad,
                username,
                email,
                tipoPersona,
              },
              true
            );
          }}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};
