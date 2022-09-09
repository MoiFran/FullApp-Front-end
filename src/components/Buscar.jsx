import axios from "axios";
import React, { useState, useEffect } from "react";
import Tabla from "./Tabla";
//import './Buscar.css';

const Buscar = () => {
  const [query, setQuery] = useState("");
  const [datos, setDatos] = useState([]);

  const gestorBusca = (e) => {
    setQuery(e.target.value);
  };

  const gestorTecla = (e) => {
    const tecla = e.target.value;
    console.log(tecla);
  };

  useEffect(() => {
    const recupera = async () => {
      if (query.length === 0) {
        const res = await axios.get(
          "https://fast-envoy-361708.wl.r.appspot.com/api/cursos"
        );
        setDatos(res.data.cursos);
      } else {
        const res = await axios.get(
          `https://fast-envoy-361708.wl.r.appspot.com/api/cursos${query}`
        );
        setDatos(res.data.cursos);
      }
    };
    recupera();
  }, [query]);

  return (
    <div style={{ justifyContent: "center", paddingLeft: "100px" }}>
      <input
        type="text"
        name="busca"
        placeholder="Buscar Curso"
        onChange={gestorBusca}
        onKeyDown={gestorTecla}
        style={{
          display: "flex",
          marginLeft: 700,
          height: "50px",
          width: "320px",
          fontSize: "50px",
          padding: "15px",
          borderRadius: "5px",
          marginTop: "30px",
        }}
      />
      {/* {datos.map((dato) => {
        return <h1>{dato.nombre}</h1>;
      })} */}
      <Tabla datos={datos} />
    </div>
  );
};

export default Buscar;
