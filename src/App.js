import "./App.css";
import RequireAuth from "./Components/requireAuth";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./views/dashboard/dashboard";
import SignIn from "./views/login/signIn";
import Layout from "./Components/layout";
import Usuarios from "./views/usuarios/UsuarioDashboard";
import UsuariosEdificioDashboard from "./views/usuarios/UsuariosEdificioDashboard";
import UsuariosUnidadDashboard from "./views/usuarios/UsuariosUnidadDashboard";
import ReclamosDashboard from "./views/reclamo/ReclamoDashboard";
import EdificioDashboard from "./views/edificios/EdificioDashboard";
import UnidadDashboard from "./views/edificios/UnidadDashboard";
import Error404 from "./views/404/404";
import { HomePage } from "./views/home/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/*Public Routes*/}
          <Route path="/login" element={<SignIn />} />
          <Route path="/*" element={<Error404 />} />
          <Route path="/" element={<HomePage />} />


          {/*Protected Routes*/}
          <Route element={<RequireAuth />}>
            <Route path="/usuarios" element={<Usuarios />} />
            <Route
              path="/usersaddunidad"
              element={<UsuariosEdificioDashboard />}
            />
            <Route
              path="/usersaddunidades/:id/:direccion"
              element={<UsuariosUnidadDashboard />}
            />
            <Route path="/edificios" element={<EdificioDashboard />} />
            <Route
              path="/detalle-unidades/:id/:direccion"
              element={<UnidadDashboard />}
            />
            <Route path="/reclamos" element={<ReclamosDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
