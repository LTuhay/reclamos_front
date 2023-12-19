import React, { useContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import UnidadPersonasButton from "./UnidadPersonasButton";
import { useParams } from "react-router-dom";
import BackButton from "./BackButton";
import UnidadesDelButton from "./UnidadesDel";
import UnidadesAdd from "./UnidadesAdd";
import Boton from "./Boton";
import UnidadUpdate from "./UnidadUpdate";
import { Navbar } from "./NavBar";

const UnidadesAll = () => {
  const { id, direccion } = useParams();
  const { auth } = useAuth();
  const [unidad, setUnidad] = useState([]);
  const [showUnidadesAddModal, setShowUnidadesAddModal] = useState(false);
  const [showUnidadUpdateModal, setshowunidadUpdateModal] = useState(false);

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

  const openModal = () => {
    setShowUnidadesAddModal(true);
  };

  const closeModal = () => {
    setShowUnidadesAddModal(false);
  };

  const openUpdateModal = (uni) => {
    setshowunidadUpdateModal((prev) => ({ ...prev, [uni]: true }));
  };

  const closeUpdateModal = (uni) => {
    setshowunidadUpdateModal((prev) => ({ ...prev, [uni]: false }));
    handleReload();
  };

  const handleReload = () => {
    fetchUnidad();
  };

  const renderTabla = () => {
    return (
      <table
        className="table table-hover tabla-edificiosall"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th style={cellStyle}>Número</th>
            <th style={cellStyle}>Piso</th>
            <th style={cellStyle}>Estado</th>
            <th style={cellStyle}></th>
            <th style={cellStyle}></th>
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
                <UnidadPersonasButton id={uni.id} personas={uni.personas} />
              </td>
              <td style={{ ...cellStyle, textAlign: "center" }}>
                <Boton
                  label="Modificar unidad"
                  onClick={() => openUpdateModal(uni.id)}
                />
                {showUnidadUpdateModal[uni.id] && (
                  <UnidadUpdate
                    id={uni.id}
                    onClose={() => closeUpdateModal(uni.id)}
                  />
                )}
              </td>
              <td style={{ ...cellStyle, textAlign: "center" }}>
                <UnidadesDelButton
                  idUnidad={uni.id}
                  onDeleteSuccess={handleReload}
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
    <div className="container">
      <div className="container d-flex flex-column align-items-center justify-content-center p-4">
        <h1>Lista de unidades del edificio {direccion}</h1>
        {unidad.length === 0 ? renderVacio() : renderTabla()}
        <div>
          <Boton
            color="btn-warning"
            label="Agregar Unidades"
            onClick={openModal}
          />
          {showUnidadesAddModal && (
            <UnidadesAdd
              edificioId={id}
              onClose={closeModal}
              reload={handleReload}
            />
          )}
        </div>
        <div className="text-center mt-3">
          <BackButton />
        </div>
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

export default UnidadesAll;
