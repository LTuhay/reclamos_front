import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import useAuth from "../hooks/useAuth";

const FiltrosReclamos = ({ onFilter, onClearFilters }) => {
  const { auth } = useAuth();
  const [filtroEdificioId, setFiltroEdificioId] = useState('');
  const [filtroUserId, setFiltroUserId] = useState('');
  const [filtroTipoReclamo, setFiltroTipoReclamo] = useState('');
  const [filtroEstadoReclamo, setFiltroEstadoReclamo] = useState('');
  const [userRole, setUserRole] = useState(auth.role);
  const [userId, setUserId] = useState(auth.id);
  const [edificios, setEdificios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const token = auth.token;


  useEffect(() => {
    // Llama a las funciones de obtener edificios y usuarios al cargar el componente
    obtenerEdificios();
    obtenerUsuarios();
  }, []);


  const obtenerEdificios = async () => {
    try {
      const response = await fetch('http://localhost:8080/edificios/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const edificiosData = await response.json();
        setEdificios(edificiosData);
        console.log('Edificios', edificiosData);
      } else {
        console.error('Error al obtener edificios:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:8080/users/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const usuariosData = await response.json();
        setUsuarios(usuariosData);
      } else {
        console.error('Error al obtener usuarios:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFilter = () => {

    const userIdValue =
      (userRole === 'Administrador' || userRole === 'Empleado') ?
        (filtroUserId !== '' ? filtroUserId : null) :
        userId;
    const buildingIdValue = filtroEdificioId !== '' ? filtroEdificioId : null;
    const tipoReclamoValue = filtroTipoReclamo || null;
    const estadoReclamoValue = filtroEstadoReclamo || null;

    // Enviar los filtros al componente padre
    onFilter({
      userId: userIdValue,
      buildingId: buildingIdValue,
      tipoReclamo: tipoReclamoValue,
      estadoReclamo: estadoReclamoValue,
    });
  };

  const handleClear = () => {
    setFiltroEdificioId('');
    setFiltroUserId('');
    setFiltroTipoReclamo('');
    setFiltroEstadoReclamo('');

    // Llamar a la funciÃ³n para limpiar los filtros
    onClearFilters();
  };

  return (
    <Form>
      <Row>
        <Col>
          <Form.Group controlId="formTipoReclamo">
            <Form.Label>Tipo:</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-tipo-reclamo">
                {filtroTipoReclamo || 'Selecciona un tipo'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFiltroTipoReclamo('PorUnidad')}>Por Unidad</Dropdown.Item>
                <Dropdown.Item onClick={() => setFiltroTipoReclamo('PorEspacioComun')}>Por Espacio Comun</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="filtroTipoReclamo">
            <Form.Label>Estado:</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-tipo-reclamo">
                {filtroEstadoReclamo || 'Selecciona un tipo'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFiltroEstadoReclamo('Nuevo')}>Nuevo</Dropdown.Item>
                <Dropdown.Item onClick={() => setFiltroEstadoReclamo('Actualizado')}>Actualizado</Dropdown.Item>
                <Dropdown.Item onClick={() => setFiltroEstadoReclamo('Desestimado')}>Desestimado</Dropdown.Item>
                <Dropdown.Item onClick={() => setFiltroEstadoReclamo('Cerrado')}>Cerrado</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Col>

        {(userRole === 'Administrador' || userRole === 'Empleado') && (
          <Col>
            <Form.Group controlId="filtroUserId">
              <Form.Label>Usuario:</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-usuario">
                  {filtroUserId
                    ? usuarios.find((user) => user.id === filtroUserId)?.nombre
                    : 'Selecciona un usuario'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {usuarios.map((user) => (
                    <Dropdown.Item
                      key={user.id}
                      onClick={() => setFiltroUserId(user.id)}>
                      {user.nombre}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Col>
        )}

        <Col>
          <Form.Group controlId="filtroEdificioId">
            <Form.Label>Edificio:</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-edificio">
                {filtroEdificioId
                  ? edificios.find((edif) => edif.id === filtroEdificioId)?.direccion
                  : 'Selecciona un edificio'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {edificios.map((edif) => (
                  <Dropdown.Item
                    key={edif.id}
                    onClick={() => setFiltroEdificioId(edif.id)}
                  >
                    {edif.direccion}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Col>

        <Col>
          <Button variant="primary" onClick={handleFilter}>
            Filtrar
          </Button>
        </Col>

        <Col>
          <Button variant="secondary" onClick={handleClear}>
            Limpiar Filtros
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FiltrosReclamos;