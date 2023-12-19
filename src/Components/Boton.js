import React from "react";

const Boton = ({ label, onClick, color }) => {
  const btnColor = color || 'btn-primary';
  return (
    <button type="button" className={`btn ${btnColor} mb-2`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Boton;