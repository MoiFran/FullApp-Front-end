import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = ({ darAcceso }) => {
  const navegar = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("DatosUsuario");
  };
  useEffect(() => {
    cerrarSesion();
    navegar("/");
    darAcceso(false);
  }, []);
};

export default Logout;
