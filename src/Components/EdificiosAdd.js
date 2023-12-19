//EdificiosAdd.js

import React, { useContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Modal, Button, Form } from "react-bootstrap";
import UnidadesAdd from "./UnidadesAdd";
import Swal from "sweetalert2";

const EdificiosAdd = ({ onClose, reload }) => {
  const { auth } = useAuth();
  const [direccion, setDireccion] = useState("");
  const [showUnidadesAdd, setShowUnidadesAdd] = useState(false);
  const [idEdificio, setIdEdificio] = useState(null);

  const handleAgregarEdificio = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/edificios/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ direccion }), // Enviar la dirección como parte del cuerpo de la solicitud
      });

      if (response.ok) {
        const edificioId = await response.text();
        console.log("Edificio creado correctamente con ID", edificioId);
        setIdEdificio(edificioId);
        setShowUnidadesAdd(true);
      } else if (response.status === 409) {
        const errorMessage =
          "Ya existe un edificio registrado con esa dirección";
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      } else {
        console.error("Error al crear el edificio:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo edificio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showUnidadesAdd ? (
          <UnidadesAdd
            edificioId={idEdificio}
            reload={reload}
            onClose={() => {
              setShowUnidadesAdd(false);
              onClose();
            }}
          />
        ) : (
          <Form onSubmit={handleAgregarEdificio}>
            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección:</Form.Label>
              <Form.Control
                type="text"
                value={direccion}
                required
                onInvalid={(e) =>
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Por favor, ingresar dirección",
                  })
                }
                onChange={(e) => setDireccion(e.target.value)}
              />
            </Form.Group>
            <div className="text-center mt-2">
              <Button type="submit">Agregar edificio</Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EdificiosAdd;
