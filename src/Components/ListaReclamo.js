import React, { useState, useEffect } from 'react';
import ReclamoCard from './ReclamoCard';

const ListaReclamo = ({ reclamos, onEdit, onDelete, actualizacionImagenes, setActualizacionImagenes }) => {
  // Agrupa los reclamos en filas de a 2
  const reclamosPorFila = reclamos.reduce((fila, reclamo, index) => {
    if (index % 2 === 0) {
      fila.push([reclamo]);
    } else {
      fila[fila.length - 1].push(reclamo);
    }
    return fila;
  }, []);

  // Si hay una sola tarjeta en la última fila, agrégale una tarjeta vacía para centrarla
  const ultimaFila = reclamosPorFila[reclamosPorFila.length - 1];
  if (ultimaFila.length === 1) {
    ultimaFila.push(null);
  }

  return (
    <div className="container">
      {reclamosPorFila.map((fila, index) => (
        <div key={index} className="row justify-content-center mb-3">
          {fila.map((reclamo, colIndex) => (
            <div key={colIndex} className="col-md-4">
              {reclamo && (
                <ReclamoCard
                  reclamo={reclamo}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  actualizacionImagenes={actualizacionImagenes}
                  setActualizacionImagenes={setActualizacionImagenes}
                  className="card mx-auto"
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListaReclamo;