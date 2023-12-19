
import React from 'react';
import { Link } from 'react-router-dom';
import Boton from './Boton';

const EdificioModificarButton = ({ id, direccion }) => {
    return (
        <Link to={`/edificios-update/${id}/${encodeURIComponent(direccion)}`}>
            <Boton label="Modificar"></Boton>
        </Link>
    );
};

export default EdificioModificarButton;
