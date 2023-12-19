// EdificiosAll.js
import React, { useContext, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth.js";
import EdificioVerButton from "../EdificioVerButton";
import BackButton from "../BackButton";
import { Navbar } from "../NavBar";
import { useLocation } from "react-router-dom";
import ButtonVerUnidades from "./ButtonVerUnidades";

const UsersAdminAddUnidad = () => {
  const { auth } = useAuth();
  const [edif, setEdif] = useState([]);
  const [showEdificioAddModal, setShowEdificioAddModal] = useState(false);
  const [showUnidadesAddModal, setShowUnidadesAddModal] = useState(false);
  const [idEdificio, setIdEdificio] = useState(null);

  const location = useLocation();

  const fetchEdif = async () => {
    try {
      const response = await fetch("http://localhost:8080/edificios/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (response.ok) {
        const edifData = await response.json();
        setEdif(edifData);
        console.log("Edificios", edifData);
      } else {
        console.error("Error al obtener edificios:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchEdif();
  }, [auth.token]);

  const handleReload = () => {
    fetchEdif();
  };

  const renderTabla = () => {
    return (
      <table
        className="table table-hover table-stripped table-responsive mh-50 "
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th style={cellStyle}>Dirección</th>
            <th style={cellStyle}></th>
            <th style={cellStyle}></th>
            <th style={cellStyle}></th>
          </tr>
        </thead>
        <tbody>
          {edif.map((edificio) => (
            <tr key={edificio.direccion}>
              <td style={{ ...cellStyle, textAlign: "center" }}>
                {edificio.direccion}
              </td>
              <td style={{ ...cellStyle, textAlign: "center" }}>
                <ButtonVerUnidades
                  id={edificio.id}
                  direccion={edificio.direccion}
                  username={location.state.username}
                />
              </td>
              <td style={{ ...cellStyle, textAlign: "center" }}></td>
              <td style={{ ...cellStyle, textAlign: "center" }}></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderVacio = () => {
    return (
      <div className="container d-flex flex-column align-items-center justify-content-center border border-light p-4">
        <h2>No hay edificios para mostrar</h2>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <h1>Seleccionar edificio para {location.state.username}</h1>
      {edif.length === 0 ? renderVacio() : renderTabla()}
      <BackButton />
    </div>
  );
};

const cellStyle = {
  border: "1px solid black",
  padding: "8px",
  textAlign: "center",
  border: "none",
};

export default UsersAdminAddUnidad;
