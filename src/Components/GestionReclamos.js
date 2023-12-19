import React, { useState, useEffect, useContext } from "react";
import ListaReclamo from "./ListaReclamo";
import FormularioReclamo from "./FormularioReclamo";
import "./App2.css";
import ReclamoService from "../Services/ReclamoService";
import useAuth from "../hooks/useAuth";
import FiltrosReclamos from "./FiltrosReclamos";

const GestionReclamos = () => {
  const { auth } = useAuth();
  const token = auth.token;
  const [reclamos, setReclamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [reclamoEnEdicion, setReclamoEnEdicion] = useState(null);
  const userRole = auth.role;
  const userId = auth.id;
  const [actualizacionImagenes, setActualizacionImagenes] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let reclamosData;
        if (userRole === 'Administrador' || userRole === 'Empleado') {
          reclamosData = await ReclamoService({
            tipoLlamada: 'obtenerReclamos',
            parametros: { token },
          });
        } else if (userRole === 'Inquilino' || userRole === 'Propietario') {
          reclamosData = await ReclamoService({
            tipoLlamada: 'filterReclamos',
            parametros: { token, filtros: { userId: userId } },
          });

        }

        setReclamos(reclamosData || []);
      } catch (error) {
        console.error("Error al obtener reclamos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, userRole, userId]);

  const handleEdit = async (id) => {
    try {
      console.log("Este es el ID de handleEdit", id);
      const reclamoDetalles = await ReclamoService({
        tipoLlamada: "buscarReclamoId",
        parametros: { id, token },
      });
      setReclamoEnEdicion(reclamoDetalles);
      setShowModal(true);
    } catch (error) {
      console.error("Error al obtener detalles del reclamo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await ReclamoService({
        tipoLlamada: "deleteReclamoId",
        parametros: { id, token },
      });

      if (userRole === 'Administrador' || userRole === 'Empleado') {
        const reclamosData = await ReclamoService({
          tipoLlamada: 'obtenerReclamos',
          parametros: { token },
        });
        setReclamos(reclamosData || []);
      } else {
        setReclamos((prevReclamos) =>
          prevReclamos.filter((reclamo) => reclamo.reclamo_id !== id)
        );
      }
    } catch (error) {
      console.error("Error al eliminar reclamo:", error);
    }
  };

  const handleSubmit = async (nuevoReclamo) => {
    try {
      if (reclamoEnEdicion) {
        await ReclamoService({
          tipoLlamada: "actualizarReclamo",
          parametros: {
            token,
            nuevoReclamo,
          },
        });
      } else {
        await ReclamoService({
          tipoLlamada: "crearReclamo",
          parametros: { token, nuevoReclamo },
        });
      }

      let reclamosData;

      // Actualizar la lista según el rol del usuario
      if (userRole === 'Administrador' || userRole === 'Empleado') {
        reclamosData = await ReclamoService({
          tipoLlamada: 'obtenerReclamos',
          parametros: { token },
        });
      } else {
        // Si no es administrador o empleado, obtener reclamos filtrados por su userId
        reclamosData = await ReclamoService({
          tipoLlamada: 'filterReclamos',
          parametros: { token, filtros: { userId } },
        });
      }

      setReclamos(reclamosData || []);

      setReclamoEnEdicion(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error al crear o actualizar reclamo:", error);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setReclamoEnEdicion(null);
  };

  const closeModal = () => {
    setActualizacionImagenes(true);
    setShowModal(false);
    setReclamoEnEdicion(null);
  };

  const handleFilter = async (filtros) => {
    try {
      const {
        userId = null,
        buildingId = null,
        state = null,
        type = null,
      } = filtros;
      console.log("Estos son los filtros en Gestion", filtros);

      const reclamosData = await ReclamoService({
        tipoLlamada: "filterReclamos",
        parametros: { token, filtros },
      });
      if (reclamosData) {
        setReclamos(reclamosData);
      } else {
        console.log("No se encontraron reclamos.");
        setReclamos([]);
      }
    } catch (error) {
      console.error("Error al aplicar filtros:", error);
    }
  };

  const handleClearFilters = async () => {
    try {
      let reclamosData;

      // Si el usuario es administrador o empleado, obtener todos los reclamos
      if (userRole === 'Administrador' || userRole === 'Empleado') {
        reclamosData = await ReclamoService({
          tipoLlamada: 'obtenerReclamos',
          parametros: { token },
        });
      } else {
        // Si no es administrador o empleado, obtener reclamos filtrados por su userId
        console.log("Entrando en los lele")
        reclamosData = await ReclamoService({
          tipoLlamada: 'filterReclamos',
          parametros: { token, filtros: { userId: userId } },
        });
      }

      setReclamos(reclamosData || []);
    } catch (error) {
      console.error('Error al limpiar filtros:', error);
    }
  };

  return (
    <div className="gestion-reclamos">
    <div className="btn-nuevo-reclamo-container">
          {(userRole !== 'Administrador') ? (
            <button className="btn-nuevo-reclamo" onClick={openModal}>
            Nuevo Reclamo
            </button>
          ) : (null)}
        </div>
        {showModal && (
          <FormularioReclamo
            onSubmit={handleSubmit}
            onClose={closeModal}
            reclamoEnEdicion={reclamoEnEdicion}
          />
        )}
        <div className="grid-container">
          <div className="filtros-container">
            <FiltrosReclamos
              onFilter={handleFilter}
              onClearFilters={handleClearFilters}
            />
          </div>
          {loading ? (
            <div className="lista-reclamos-container">Cargando reclamos...</div>
          ) : (
            <>
              {reclamos.length > 0 ? (
                <ListaReclamo
                  reclamos={reclamos}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  actualizacionImagenes={actualizacionImagenes}
                  setActualizacionImagenes={setActualizacionImagenes}
                />
              ) : (
                <div className="lista-reclamos-container">
                  No existen reclamos.
                </div>
              )}
            </>
          )}
        </div>
    </div>
  );
};

export default GestionReclamos;
