import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import axios from "axios";
import Img4 from "../imgs/6-thumb.jpg";
import { useNavigate } from "react-router-dom";

const ModificarCursos = ({ curso }) => {
  //let URL = process.env.REACT_APP_BACKEND_URL + "/cursos";
  const navegar = useNavigate();
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
        `https://fast-envoy-361708.wl.r.appspot.com/api/cursos/${curso._id}`,
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
        navegar("/curso");
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
      <img
        src={Img4}
        alt=""
        style={{
          border: "none",
          borderRadius: 10,
          boxShadow: " 3px 3px 10px",
          marginBottom: 10,
        }}
      />

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
            .delete(
              "https://fast-envoy-361708.wl.r.appspot.com/api/cursos/" +
                curso._id,
              {
                headers: {
                  Authorization: "Bearer " + extraerDatosDeUsuario()[0], // En los headers van 'Bearer ' + token recibido
                },
              }
            )
            .then((response) => {
              window.location.reload(true);
              navegar("/curso");
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
