// EdificiosAll.js
import React, { useContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import EdificioEliminarButton from "./EdificiosDel";
import EdificioVerButton from "./EdificioVerButton";
import BackButton from "./BackButton";
import EdificiosAdd from "./EdificiosAdd";
import Boton from "./Boton";
import EdificiosUpdate from "./EdificiosUpdate";
import EdificiosSearch from "./EdificiosSearch";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const EdificiosAll = () => {
  const { auth } = useAuth();
  const [edif, setEdif] = useState([]);
  const [showEdificioAddModal, setShowEdificioAddModal] = useState(false);
  const [showUnidadesAddModal, setShowUnidadesAddModal] = useState(false);
  const [showEdificioUpdateModal, setshowEdificioUpdateModal] = useState({});
  const [idEdificio, setIdEdificio] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  const openModal = () => {
    setShowEdificioAddModal(true);
  };

  const openUpdateModal = (id) => {
    setshowEdificioUpdateModal((prev) => ({ ...prev, [id]: true }));
  };

  const closeModal = () => {
    setShowEdificioAddModal(false);
    setShowUnidadesAddModal(false);
    setIdEdificio(null);
  };

  const closeUpdateModal = (id) => {
    setshowEdificioUpdateModal((prev) => ({ ...prev, [id]: false }));
    handleReload();
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredResults = edif.filter((edificio) =>
      edificio.direccion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const renderTabla = () => {
    const dataToRender = searchTerm ? searchResults : edif;
    return (
      <div>
        <div className="container d-flex flex-column align-items-center justify-content-center p-4">
          <EdificiosSearch onSearch={handleSearch} />
        </div>
        <table
          className="table table-hover tabla-edificiosall"
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
            {dataToRender.map((edificio) => (
              <tr key={edificio.direccion}>
                <td style={{ ...cellStyle, textAlign: "center" }}>
                  {edificio.direccion}
                </td>
                <td style={{ ...cellStyle, textAlign: "center" }}>
                  <EdificioVerButton
                    id={edificio.id}
                    direccion={edificio.direccion}
                  />
                </td>
                <td style={{ ...cellStyle, textAlign: "center" }}>
                  <Boton
                    label="Modificar edificio"
                    onClick={() => openUpdateModal(edificio.id)}
                  />
                  {showEdificioUpdateModal[edificio.id] && (
                    <EdificiosUpdate
                      id={edificio.id}
                      direccion={edificio.direccion}
                      onClose={() => closeUpdateModal(edificio.id)}
                    />
                  )}
                </td>
                <td style={{ ...cellStyle, textAlign: "center" }}>
                  <EdificioEliminarButton
                    direccion={edificio.direccion}
                    onDeleteSuccess={handleReload}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={15}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 440,
          }}
        >
    <div className="container d-flex flex-column align-items-center justify-content-center  p-4">
      {edif.length === 0 ? renderVacio() : renderTabla()}
      <div>
        <Boton
          color="btn-warning"
          label="Agregar edificio"
          onClick={openModal}
        />
        {showEdificioAddModal && (
          <EdificiosAdd
            onSubmit={(newIdEdificio) => {
              setIdEdificio(newIdEdificio);
            }}
            onClose={closeModal}
            reload={handleReload}
          />
        )}
      </div>
      <BackButton />
    </div>
    </Paper>
    </Grid>
    </Grid>
    </Container>


  );
};

const cellStyle = {
  border: "1px solid black",
  padding: "8px",
  textAlign: "center",
  border: "none",
};

export default EdificiosAll;
