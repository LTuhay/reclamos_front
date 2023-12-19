import React from "react";
import { Link, Navigate } from "react-router-dom";

function Error404() {
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRedirect(true);
    }, 5000);

 
    return () => clearTimeout(timeoutId);
  }, []);

 
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Error 404 - Página no encontrada</h1>
      <p>La página que quieres acceder no existe.</p>
      <p>Te estamos redirigiendo a la página de inicio...</p>
      <p>
        Si no eres redirigido automáticamente, puedes hacer clic{" "}
        <Link to="/">aquí</Link>.
      </p>
    </div>
  );
}

export default Error404;