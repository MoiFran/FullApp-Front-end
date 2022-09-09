import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Docentes = () => {
  let URL = "http://localhost:5000/api/docente";
  const [docentes, setDocentes] = useState([]);

  const getDocente = async () => {
    const extraerDatosDeUsuario = () => {
      const datosRecuperar = JSON.parse(localStorage.getItem("DatosUsuario"));
      if (datosRecuperar && datosRecuperar.token) {
        // Si existe algo que recuperar y dentro de lo recuperado existe la propiedad token

        return [datosRecuperar.token, datosRecuperar.userId];
      }
    };
    await axios
      .get(URL)
      .then((response) => {
        setDocentes(response.data.docentes);
      })
      .catch((error) => {
        console.log("mamasteeeeeee");
      });
  };

  useEffect(() => {
    getDocente();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {docentes.map((docente) => {
        return (
          <div className="Card-docente">
            <h2 key={docente.id}>{docente.nombre}</h2>
            <h3>Cursos</h3>
            <div>
              {docente.cursos.map((cursos) => {
                return (
                  <li className="Card-docente">
                    {cursos.nombre} <ol>horas: {cursos.horas}</ol>
                    <ol>{cursos.precio} €</ol>
                  </li>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Docentes;
