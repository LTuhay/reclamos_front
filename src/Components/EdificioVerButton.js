// EdificioVerButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from './Boton';

const EdificioVerButton = ({ id, direccion }) => {
    console.log("id desde el button", id)
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/detalle-unidades/${id}/${encodeURIComponent(direccion)}`);
    };

    return (
        <Boton label="Ver unidades" onClick={handleClick}>
            Ver
        </Boton>
    );
};

export default EdificioVerButton;
