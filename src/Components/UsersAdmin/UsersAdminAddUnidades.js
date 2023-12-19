import React, { useContext, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth.js";
import { useLocation, useParams } from "react-router-dom";
import BackButton from "../BackButton";
import { Navbar } from "../NavBar";
import ButtonAsignarUnidad from "./ButtonAsignarUnidad";

const UsersAdminAddUnidades = () => {
  const { id, direccion } = useParams();
  const { auth } = useAuth();
  const [unidad, setUnidad] = useState([]);
  const location = useLocation();

  const fetchUnidad = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/edificios/findUnidades?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.ok) {
        const unidadData = await response.json();
        setUnidad(unidadData);
        console.log("Unidades", unidadData);
      } else {
        console.error("Error al obtener unidades:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUnidad();
  }, [auth.token]);

  const handleEliminarSuccess = () => {
    fetchUnidad(id);
  };

  const renderTabla = () => {
    return (
      <table
        className="table table-hover table-stripped"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th style={cellStyle}>Número</th>
            <th style={cellStyle}>Piso</th>
            <th style={cellStyle}>Estado</th>
            <th style={cellStyle}></th>
          </tr>
        </thead>
        <tbody>
          {unidad.map((uni) => (
            <tr key={uni.id}>
              <td style={{ ...cellStyle, textAlign: "center" }}>{uni.nro}</td>
              <td style={{ ...cellStyle, textAlign: "center" }}>{uni.piso}</td>
              <td style={{ ...cellStyle, textAlign: "center" }}>
                {uni.estado}
              </td>
              <td style={{ ...cellStyle, textAlign: "center" }}>
                <ButtonAsignarUnidad
                  id_unidad={uni.id}
                  username={location.state.username}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderVacio = () => {
    return (
      <div className="container d-flex flex-column align-items-center justify-content-center border border-light p-4">
        <h2>No hay unidades para mostrar</h2>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <h5>Seleccionar unidad para {location.state.username}</h5>
      {unidad.length === 0 ? renderVacio() : renderTabla()}
      <div className="text-center mt-3">
        <BackButton />
      </div>
    </div>
  );
};

const cellStyle = {
  border: "1px solid black",
  padding: "8px",
  textAlign: "center",
  border: "none",
};

export default UsersAdminAddUnidades;
