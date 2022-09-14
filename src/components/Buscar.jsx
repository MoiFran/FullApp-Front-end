import axios from "axios";
import React, { useState, useEffect } from "react";
import Tabla from "./Tabla";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
//import './Buscar.css';

const Buscar = () => {
  let URL = process.env.REACT_APP_BACKEND_URL;
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
        const res = await axios.get(URL + "/cursos");
        setDatos(res.data.cursos);
      } else {
        const res = await axios.get(URL + `/cursos/buscar/${query}`);
        setDatos(res.data.cursos);
      }
    };
    recupera();
  }, [query]);

  return (
    <div>
      <Form className="col-lg-3 col-md-4 col-sm-6 col-xs-12 d-flex offset-md-4 offset-sm-4 offset-xs-4">
        <Form.Control
          onChange={gestorBusca}
          onKeyDown={gestorTecla}
          type="search"
          placeholder="Buscar Curso"
          className="me-4"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>

      {/* {datos.map((dato) => {
        return <h1>{dato.nombre}</h1>;
      })} */}
      <Tabla datos={datos} />
    </div>
  );
};

export default Buscar;
