import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Docente from "./Docente";
import ModificarCursos from "./ModificarCursos";

const AreaDeTrabajo = () => {
  let URL = process.env.REACT_APP_BACKEND_URL;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const extraerDatosDeUsuario = () => {
    const datosRecuperar = JSON.parse(localStorage.getItem("DatosUsuario"));

    if (datosRecuperar && datosRecuperar.token) {
      // Si existe algo que recuperar y dentro de lo recuperado existe la propiedad token

      return [datosRecuperar.token, datosRecuperar.userId];
    }
  };

  const [docente, setDocente] = useState({});
  const getDocente = async () => {
    const data = await axios.get(
      URL + "/docente/" + extraerDatosDeUsuario()[1]
    );
    setDocente(data.data.docente);
  };

  const crearCurso = async (data) => {
    await axios
      .post(
        URL + "/cursos",
        {
          nombre: data.nombre,
          horas: data.horas,
          precio: data.precio,
          docente: extraerDatosDeUsuario()[1],
        },
        {
          headers: {
            Authorization: "Bearer " + extraerDatosDeUsuario()[0], // En los headers van 'Bearer ' + token recibido
          },
        }
      )
      .then((response) => {
        getAllCursos();
        setValue("nombre", null);
        setValue("horas", null);
        setValue("precio", null);
        setValue("docente", null);
        console.log("im working");
        console.log("Todo correcto", response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  console.log(docente);
  console.log(docente.nombre);

  const [cursos, setCursos] = useState([]);

  const getAllCursos = async () => {
    try {
      const response = await axios.get(URL + "/cursos", {
        headers: {
          Authorization: "Bearer " + extraerDatosDeUsuario()[0], // En los headers van 'Bearer ' + token recibido
        },
      });

      setCursos(response.data.cursos);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getDocente();
    getAllCursos();
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          color: "rgba(0, 0, 0, 0.285)",
          flexDirection: "column",
        }}
      >
        <h2 style={{}}>Welcome Docente </h2>
        <h2> {docente.nombre}</h2>
        <Docente />
      </div>
      <div className="Form">
        <form onSubmit={handleSubmit(crearCurso)}>
          <h1 className="title">Nuevo Curso</h1>
          <input
            className="input-all"
            type="text"
            name="nombre"
            placeholder="Nombre"
            {...register(
              "nombre",
              { minLength: 5 },
              { required: true, message: "Campo requerido" }
            )}
          />
          {errors.nombre &&
            errors.nombre.type === "required" &&
            "Campo nombre requerido"}
          {errors.nombre &&
            errors.nombre.type === "minLength" &&
            "Longitud mínima de 5 caracteres"}
          <input
            className="input-all"
            type="number"
            name="horas"
            placeholder="Horas"
            {...register(
              "horas",
              { minLength: 1 },
              { required: true, message: "Campo requerido" }
            )}
          />
          {errors.horas &&
            errors.horas.type === "required" &&
            "Campo horas requerido"}
          {errors.horas &&
            errors.horas.type === "minLength" &&
            "curso debe ser mayos a 1 horas"}
          <input
            className="input-all"
            type="number"
            name="precio"
            placeholder="precio"
            {...register("precio", {
              required: true,
              message: "Campo requerido",
            })}
          />
          {errors.precio &&
            errors.precio.type === "required" &&
            "coloque el precio del curso"}

          <input
            type="submit"
            value="Add curso"
            id="submit"
            className="btn-all"
          />
        </form>
      </div>

      <div className="card-content">
        {cursos
          .filter((filter) => {
            return filter.docente._id === extraerDatosDeUsuario()[1];
          })
          .map((curso) => {
            return <ModificarCursos curso={curso} key={curso._id} />;
          })}
      </div>
    </div>
  );
};

export default AreaDeTrabajo;
