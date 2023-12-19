import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import ReclamoService from '../Services/ReclamoService';
import  useAuth  from "../hooks/useAuth";

const defaultImage = 'https://via.placeholder.com/250x200.png?text=Sin+Foto';

function ReclamoCard({ reclamo, onEdit, onDelete, actualizacionImagenes, setActualizacionImagenes}) {
  const [imagenesReclamo, setImagenesReclamo] = useState([]);
  const  {auth}  = useAuth();
  const token = auth.token;

  useEffect(() => {
    const obtenerImagenesReclamo = async () => {
      try {
        const response = await ReclamoService({
          tipoLlamada: 'findImagesByReclamoId',
          parametros: { token: token, id: reclamo.reclamo_id },
        });

        if (response) {
          setImagenesReclamo(response);
        }
      } catch (error) {
        console.error('Error al obtener imágenes del reclamo:', error);
      }
    };

    obtenerImagenesReclamo();
    if (actualizacionImagenes) {
      setActualizacionImagenes(false);
    }
  }, [reclamo.reclamo_id, token, actualizacionImagenes]);

  const handleEditClick = () => {
    // Llama a la función de edición pasada como prop
    console.log('Este es el reclamoID', reclamo.reclamo_id);
    onEdit(reclamo.reclamo_id);
  };

  const handleDeleteClick = () => {
    // Llama a la función de eliminación pasada como prop
    console.log('Este es el reclamoID', reclamo.reclamo_id);
    onDelete(reclamo.reclamo_id);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Carousel style={{ maxHeight: '200px', overflow: 'hidden' }}>
        {imagenesReclamo && imagenesReclamo.length > 0 ? (
          imagenesReclamo.map((imagen, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={`data:image/jpeg;base64,${imagen.datosImagen}`}
                alt={`Imagen ${index + 1}`}
                style={{ objectFit: 'cover', height: '200px' }}
              />
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={defaultImage}
              alt="Sin Foto"
              style={{ objectFit: 'cover', height: '200px' }}
            />
          </Carousel.Item>
        )}
      </Carousel>
      <Card.Body>
        <Card.Title>{reclamo.titulo}</Card.Title>
        <Card.Text>{reclamo.descripcion}</Card.Text>
        <Card.Text>Estado: {reclamo.estadoReclamo}</Card.Text>
        <Card.Text>Tipo: {reclamo.tipoReclamo}</Card.Text>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant="primary" onClick={handleEditClick}>
            Editar
          </Button>
          <Button variant="danger" onClick={handleDeleteClick}>
            Eliminar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ReclamoCard;
