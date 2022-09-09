import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Docentes = () => {
  let URL = "https://fast-envoy-361708.wl.r.appspot.com/api/docente";
  const [docentes, setDocentes] = useState([]);

  const getDocente = async () => {
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
