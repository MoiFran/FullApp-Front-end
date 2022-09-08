import { React, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  NavLink,
} from "react-router-dom";
import "./CSS/App.css";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Inicio from "./components/Inicio";
import Curso from "./components/AreaDeTrabajo";
import Docentes from "./components/Docentes";
import Logout from "./components/Logout";
import ModificarCursos from "./components/ModificarCursos";
function App() {
  const datosUsuario = localStorage.getItem("DatosUsuario");
  const datosRecuperar = datosUsuario ? JSON.parse(datosUsuario) : null;
  const [tieneAcceso, setTieneAcceso] = useState(datosRecuperar !== null);

  const darAcceso = (acceder) => {
    setTieneAcceso(acceder);
  };

  return (
    <div className="App">
      <Router>
        <div className="navbar">
          {!tieneAcceso ? (
            <div>
              <NavLink className={"navlink"} to="/">
                Inicio
              </NavLink>
              <NavLink className={"navlink"} to="/docentes">
                Docentes
              </NavLink>
              <NavLink className={"navlink"} to="/signup">
                Crear Cuenta
              </NavLink>
              <NavLink className={"navlink"} to="/acceso">
                log-in
              </NavLink>
            </div>
          ) : (
            <div>
              <NavLink className={"navlink"} to="/">
                Inicio
              </NavLink>
              <NavLink className={"navlink"} to="/curso">
                Area de trabajo
              </NavLink>
              <NavLink className={"navlink"} to="/docentes">
                Docentes
              </NavLink>
              <NavLink className={"navlink"} to="/logout">
                log -out
              </NavLink>
            </div>
          )}
        </div>
        {/* A donde se dirige cada componente */}
        <Routes>
          <Route path="/acceso" element={<LoginForm darAcceso={darAcceso} />} />
          <Route
            path="/signup"
            element={<RegisterForm darAcceso={darAcceso} />}
          />
          <Route path="/" element={<Inicio />} />
          <Route path="/curso" element={<Curso />} />
          <Route path="/docentes" element={<Docentes />} />
          <Route path="/logout" element={<Logout darAcceso={darAcceso} />} />
          <Route path="/modificar/curso" element={<ModificarCursos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
