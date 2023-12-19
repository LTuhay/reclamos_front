import React, { useState } from "react";
import Boton from "./Boton";
import Swal from "sweetalert2";
import { useContext } from "react";
import useAuth from "../hooks/useAuth";

const UnidadPersonasButton = ({ id }) => {
  const [personas, setPersonas] = useState([]);
  const [mostrarPersonas, setMostrarPersonas] = useState(false);
  const { auth } = useAuth();

  const toggleMostrarPersonas = async () => {
    try {
      if (mostrarPersonas) {
        // Si ya se están mostrando las personas, oculta la lista al hacer clic nuevamente
        setMostrarPersonas(false);
      } else {
        // Si no se están mostrando las personas, realiza la solicitud para obtenerlas
        const response = await fetch(
          `http://localhost:8080/unidades/findPersonas?id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        if (response.ok) {
          const personasData = await response.json();
          setPersonas(personasData);
          setMostrarPersonas(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al mostrar las personas",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al mostrar las personas",
      });
    }
  };

  return (
    <div>
      <Boton label="Ver habitantes" onClick={toggleMostrarPersonas} />
      {mostrarPersonas && (
        <div>
          {personas.length > 0 ? (
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>DNI</th>
                  <th>Edad</th>
                  <th>Username</th>
                  <th>Tipo de Persona</th>
                </tr>
              </thead>
              <tbody>
                {personas.map((persona, index) => (
                  <tr
                    key={persona.nombre}
                    style={{
                      borderBottom:
                        index < personas.length - 1 ? "2px solid #333" : "none",
                    }}
                  >
                    <td>{persona.nombre}</td>
                    <td>{persona.email}</td>
                    <td>{persona.dni}</td>
                    <td>{persona.edad}</td>
                    <td>{persona.username}</td>
                    <td>{persona.tipoPersona}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>La unidad no contiene habitantes.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UnidadPersonasButton;
