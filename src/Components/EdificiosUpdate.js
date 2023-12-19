import React, { useContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const EdificiosUpdate = ({ id, direccion, onClose }) => {
  const { auth } = useAuth();
  const [newdireccion, setNewDireccion] = useState("");

  const handleDireccionChange = (event) => {
    setNewDireccion(event.target.value);
  };

  const handleModificarEdificio = async () => {
    if (!newdireccion) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completar los campos",
      });
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/edificios/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ direccion: newdireccion }),
        }
      );

      if (response.ok) {
        console.log("Edificio modificado correctamente");
        onClose();
      } else {
        console.error("Error al modificar el edificio:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {}, []);

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modificar edificio {direccion}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">
              Dirección del Edificio:
            </label>
            <input
              type="text"
              className="form-control"
              id="direccion"
              onChange={handleDireccionChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleModificarEdificio}
          >
            Modificar Edificio
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EdificiosUpdate;
