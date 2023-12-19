import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form, Dropdown, Carousel } from 'react-bootstrap';
import ReclamoService from '../Services/ReclamoService';
import useAuth from "../hooks/useAuth";

const FormularioReclamo = ({ onSubmit, onClose, reclamoEnEdicion }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoReclamo, setTipoReclamo] = useState('');
  const [actualizacion, setActualizacion] = useState('');
  const [userId, setUserId] = useState('');
  const [edificioId, setEdificioId] = useState('');
  const [estadoReclamo, setEstadoReclamo] = useState('Nuevo');
  const [reclamoId, setReclamoId] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [edifData, setEdifData] = useState([]);
  const [usersData, setUsers] = useState([]);
  const { auth } = useAuth();
  const token = auth.token;
  const [userRole, setUserRole] = useState(auth.role);
  const [userIdd, setUserIdd] = useState(auth.id);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await GetAllUsers();
        fetchEdif();

        if (reclamoEnEdicion) {
          setTitulo(reclamoEnEdicion.titulo);
          setDescripcion(reclamoEnEdicion.descripcion);
          setTipoReclamo(reclamoEnEdicion.tipoReclamo);
          setActualizacion(reclamoEnEdicion.actualizacion);
          setUserId(reclamoEnEdicion.userid);
          setEdificioId(reclamoEnEdicion.edificioid);
          setEstadoReclamo(reclamoEnEdicion.estadoReclamo);
          setReclamoId(reclamoEnEdicion.reclamo_id);
          setImagenes(reclamoEnEdicion.imagenes || []);
        } else {
          if (userRole !== 'Administrador' && userRole !== 'Empleado') {
            setUserId(userIdd);
          }
        }

        cargarImagenes();
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, [reclamoEnEdicion, token, userRole, userIdd]);

  const cargarImagenes = async () => {
    if (reclamoEnEdicion && reclamoEnEdicion.reclamo_id) {
      try {
        const response = await ReclamoService({
          tipoLlamada: 'findImagesByReclamoId',
          parametros: { token: token, id: reclamoEnEdicion.reclamo_id },
        });

        if (response) {
          setImagenes(response);
        }
      } catch (error) {
        console.error('Error al obtener imágenes del reclamo:', error);
      }
    }
  };

  const fetchEdif = async () => {
    try {
      const response = await fetch('http://localhost:8080/edificios/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const edifData = await response.json();
        setEdifData(edifData);
        console.log('Edificios', edifData);
        return edifData;
      } else {
        console.error('Error al obtener edificios:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const GetAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/users/all", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const usersData = await response.json();
        setUsers(usersData);
        console.log('Usuarios', usersData);
        return usersData;
      } else {
        console.error('Error al obtener usuarios:', response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEliminarImagen = async () => {
    try {
      if (imagenes.length > 0) {
        const idImagenAEliminar = imagenes[activeIndex].id;
        await ReclamoService({
          tipoLlamada: 'deleteImageById',
          parametros: { id: idImagenAEliminar, token },
        });

        const response = await ReclamoService({
          tipoLlamada: 'findImagesByReclamoId',
          parametros: { token, id: reclamoEnEdicion.reclamo_id },
        });

        if (response) {
          setImagenes(response);
          setActiveIndex(Math.min(activeIndex, response.length - 1));
        }
      }
    } catch (error) {
      console.error('Error al eliminar imagen:', error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        await ReclamoService({
          tipoLlamada: 'uploadImage',
          parametros: {
            imagen: {
              file,
              nombre: `imagen${imagenes.length + 1}`,
              descripcion: '',
              id_reclamo: reclamoEnEdicion.reclamo_id,
            },
            token: token,
          },
        });

        const response = await ReclamoService({
          tipoLlamada: 'findImagesByReclamoId',
          parametros: { token: token, id: reclamoEnEdicion.reclamo_id },
        });

        if (response) {
          setImagenes(response);
          setActiveIndex(response.length - 1);
        }
      } catch (error) {
        console.error('Error al subir imagen:', error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica si estás editando un reclamo existente o creando uno nuevo


    onSubmit({
      titulo,
      descripcion,
      tipoReclamo,
      actualizacion,
      userId,
      edificioId,
      estadoReclamo,
      reclamoId,
      imagenes,
    });

    setTitulo('');
    setDescripcion('');
    setTipoReclamo('');
    setActualizacion('');
    setUserId('');
    setEdificioId('');
    setEstadoReclamo('');
    setReclamoId('');
    setImagenes([]);
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{reclamoEnEdicion ? 'Editar Reclamo' : 'Nuevo Reclamo'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {userRole === 'Administrador' || userRole === 'Empleado' ? (
            <Form.Group controlId="formUserId">
              <Form.Label>ID Usuario:</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-usuario">
                  {userId
                    ? usersData.find((user) => user.id === userId)?.nombre
                    : 'Selecciona un usuario'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {usersData.map((user) => (
                    <Dropdown.Item
                      key={user.id}
                      onClick={() => setUserId(user.id)}>
                      {user.nombre}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          ) : null}
          <Form.Group controlId="formEdificioId">
            <Form.Label>Edificio:</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-edificio">
                {edificioId
                  ? edifData.find((edif) => edif.id === edificioId)?.direccion
                  : 'Selecciona un edificio'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {edifData.map((edif) => (
                  <Dropdown.Item
                    key={edif.id}
                    onClick={() => setEdificioId(edif.id)}
                  >
                    {edif.direccion}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group controlId="formTitulo">
            <Form.Label>Título:</Form.Label>
            <Form.Control
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescripcion">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              as="textarea"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formTipoReclamo">
            <Form.Label>Tipo de Reclamo:</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-tipo-reclamo">
                {tipoReclamo || 'Selecciona un tipo'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setTipoReclamo('PorUnidad')}>
                  PorUnidad
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTipoReclamo('PorEspacioComun')}>
                  PorEspacioComun
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          {userRole == 'Administrador' ? (
          <Form.Group controlId="formEstadoReclamo">
            <Form.Label>Estado de Reclamo:</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-tipo-reclamo">
                {estadoReclamo || 'Selecciona un tipo'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setEstadoReclamo('Nuevo')}>
                  Nuevo
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setEstadoReclamo('Actualizado')}
                >
                  Actualizado
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setEstadoReclamo('Desestimado')}
                >
                  Desestimado
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setEstadoReclamo('Cerrado')}>
                  Cerrado
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          ) : (
            <Form.Group controlId="formEstadoReclamo">
            <Form.Label>Estado de Reclamo: </Form.Label>
            <Dropdown>
              <Dropdown.Toggle disabled variant="dark" id="dropdown-tipo-reclamo">
                {estadoReclamo}
              </Dropdown.Toggle>
              </Dropdown>
              <div> - </div>
              </Form.Group>
          )}
          {userRole == 'Administrador' ? (
          <Form.Group controlId="formActualizacion">
            <Form.Label>Actualización:</Form.Label>
            <Form.Control
              as="textarea"
              value={actualizacion}
              onChange={(e) => setActualizacion(e.target.value)}
            />
          </Form.Group>
          ) : (
            <Form.Group controlId="formActualizacion">
            <Form.Label>Actualización:</Form.Label>
            <Form.Control
              disabled
              as="textarea"
              value={actualizacion}
            />
            </Form.Group>
            )}
          {reclamoEnEdicion ? (
            <Form.Group controlId="formImagenes">
              <Form.Label>Imágenes:</Form.Label>
              <Carousel
                nextLabel="Siguiente"
                prevLabel="Anterior"
                style={{ color: 'black' }}
                activeIndex={activeIndex}
                onSelect={(index) => setActiveIndex(index)}
              >
                {imagenes.map((imagen, index) => (
                  <Carousel.Item key={imagen.id}>
                    {imagen.datosImagen ? (
                      <>
                        <img
                          className="d-block w-100"
                          src={`data:image/jpeg;base64,${imagen.datosImagen}`}
                          alt={`Imagen ${imagen.id}`}
                          style={{ backgroundColor: 'black' }}
                        />
                      </>
                    ) : null}
                  </Carousel.Item>
                ))}
              </Carousel>
              {imagenes.length > 0 && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleEliminarImagen}
                  style={{
                    position: 'absolute',
                    bottom: '120px',
                    right: '35px',
                    zIndex: 1,
                    marginLeft: '-50px',
                  }}
                >
                  Eliminar
                </Button>
              )}
              <Form.Group
                controlId="formFile"
                style={{ marginTop: '10px' }}
              >
                <Form.Label>Subir nueva imagen:</Form.Label>
                <input type="file" onChange={handleFileChange} />
              </Form.Group>
            </Form.Group>
          ) : null}
          <div
            style={{
              marginTop: '15px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button variant="primary" type="submit">
              {reclamoEnEdicion ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormularioReclamo;
