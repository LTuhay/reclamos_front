import React, { useContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const UnidadUpdate = ({ id, onClose }) => {
  const { auth } = useAuth();
  const [numero, setNumero] = useState("");
  const [piso, setPiso] = useState("");
  const [estado, setEstado] = useState("Inhabitada");

  const handleModificarUnidad = async () => {
    if (!numero || !piso) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completar los campos",
      });
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/unidades/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            nro: numero,
            piso: piso,
            estado: estado,
          }),
        }
      );

      if (response.ok) {
        console.log("Unidad modificada correctamente");
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
        <Modal.Title>Modificar unidad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="numero" className="form-label">
              Número:
            </label>
            <input
              type="text"
              className="form-control"
              id="numero"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="piso" className="form-label">
              Piso:
            </label>
            <input
              type="text"
              className="form-control"
              id="piso"
              value={piso}
              onChange={(e) => setPiso(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="estado" className="form-label">
              Estado:
            </label>
            <select
              className="form-select"
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="Inhabitada">Inhabitada</option>
              <option value="Alquilada">Alquilada</option>
              <option value="HabitadaPorDuenio">Habitada por dueño</option>
            </select>
          </div>
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={handleModificarUnidad}
          >
            Guardar y Continuar
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UnidadUpdate;
