import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import axios from "axios";

const ModificarCursos = ({ curso }) => {
  let URL = "http://localhost:5000/api/cursos";

  const extraerDatosDeUsuario = () => {
    const datosRecuperar = JSON.parse(localStorage.getItem("DatosUsuario"));

    if (datosRecuperar && datosRecuperar.token) {
      // Si existe algo que recuperar y dentro de lo recuperado existe la propiedad token

      return [datosRecuperar.token, datosRecuperar.userId];
    }
  };

  const [nombre, setNombre] = useState(curso.nombre);
  const [horas, setHoras] = useState(curso.horas);
  const [precio, setPrecio] = useState(curso.precio);

  const modificar = async () => {
    await axios
      .patch(
        URL + "/" + curso._id,
        {
          nombre: nombre,
          horas: horas,
          precio: precio,
          docente: extraerDatosDeUsuario()[1],
        },
        {
          headers: {
            Authorization: "Bearer " + extraerDatosDeUsuario()[0], // En los headers van 'Bearer ' + token recibido
          },
        }
      )
      .then((response) => {
        window.location.reload(true);
        console.log("im working");
        console.log("Todo correcto", response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const gestorNombre = (e) => {
    setNombre(e.target.value);
  };
  const gestorHoras = (e) => {
    setHoras(e.target.value);
  };
  const gestorPrecio = (e) => {
    setPrecio(e.target.value);
  };

  useEffect(() => {}, []);

  return (
    <div
      className="Card-docente"
      style={{ width: "350px", padding: 20, marginRight: "20px" }}
    >
      <h2>{curso.nombre}</h2>
      <div style={{ display: "flex" }}>
        <label>
          <BiEdit style={{ width: 25, height: 30 }} />
        </label>
        <input
          className="input-modificar"
          type="text"
          placeholder={curso.nombre}
          value={nombre}
          onChange={gestorNombre}
        />
        <label>Nombre</label>
      </div>
      <div style={{ display: "flex" }}>
        <label>
          <BiEdit style={{ width: 25, height: 30 }} />
        </label>
        <input
          className="input-modificar"
          type="number"
          placeholder={curso.horas}
          value={horas}
          onChange={gestorHoras}
        />
        <label>hs</label>
      </div>
      <div style={{ display: "flex" }}>
        <label>
          <BiEdit style={{ width: 25, height: 30 }} />
        </label>
        <input
          className="input-modificar"
          type="number"
          placeholder={curso.precio}
          value={precio}
          onChange={gestorPrecio}
        />
        <label>€</label>
      </div>
      <button type="Button" onClick={modificar} className="btn-modificar">
        Modificar
      </button>
      <button
        className="btn-delete"
        onClick={async () => {
          await axios
            .delete(URL + "/" + curso._id, {
              headers: {
                Authorization: "Bearer " + extraerDatosDeUsuario()[0], // En los headers van 'Bearer ' + token recibido
              },
            })
            .then((response) => {
              window.location.reload(true);
            })
            .catch((error) => {
              console.log(error.response.data);
            });
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default ModificarCursos;
