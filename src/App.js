import { React, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  NavLink,
} from "react-router-dom";
//import "./CSS/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Inicio from "./components/Inicio";
import Curso from "./components/AreaDeTrabajo";
import Docentes from "./components/Docentes";
import Logout from "./components/Logout";
import ModificarCursos from "./components/ModificarCursos";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function App() {
  const datosUsuario = localStorage.getItem("DatosUsuario");
  const datosRecuperar = datosUsuario ? JSON.parse(datosUsuario) : null;
  const [tieneAcceso, setTieneAcceso] = useState(datosRecuperar !== null);

  const darAcceso = (acceder) => {
    setTieneAcceso(acceder);
  };

  return (
    <div className="">
      <Router>
        <div>
          <Navbar bg="secondary" expand="lg">
            <Container fluid>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto">
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
                        login
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
                        logout
                      </NavLink>
                    </div>
                  )}{" "}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          ;
          {/* {!tieneAcceso ? (
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
                login
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
                logout
              </NavLink>
            </div>
          )} */}
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
