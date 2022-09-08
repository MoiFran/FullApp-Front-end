import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import '../CSS/index.css'

const RegisterForm = ({ darAcceso }) => {
  let navegar = useNavigate();
  let URL = "https://fast-envoy-361708.wl.r.appspot.com/api/docente";
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const gestorFormulario = async (data) => {
    try {
      const response = await axios
        .post(URL, data)
        .then((resp) => {
          console.log("registro  correcto");

          console.log(resp.data);
          localStorage.setItem(
            "DatosUsuario",
            JSON.stringify({
              token: resp.data.token,
              userId: resp.data.userId,
            })
          );
          darAcceso(true);
          navegar("/curso");
        })
        .catch((error) => {
          console.log(error.message);
        });
      setValue("nombre", null);
      setValue("email", null);
      setValue("password", null);
      return console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ marginTop: 200 }}>
      <div className="Form">
        <form onSubmit={handleSubmit(gestorFormulario)}>
          <h1 className="title">Register form</h1>
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
            type="text"
            name="email"
            placeholder="email@email.com"
            {...register(
              "email",
              {
                pattern:
                  /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/,
              },
              { required: true, message: "Campo requerido" }
            )}
          />
          {errors.email &&
            errors.email.type === "required" &&
            "Campo email requerido"}
          {errors.email &&
            errors.email.type === "pattern" &&
            "Formato email incorrecto"}
          <input
            className="input-all"
            type="password"
            name="password"
            placeholder="Contraseña"
            {...register(
              "password",
              { minLength: 5 },
              { required: true, message: "Campo requerido" }
            )}
          />
          {errors.password &&
            errors.password.type === "required" &&
            "Campo contraseña requerido"}
          {errors.password &&
            errors.password.type === "minLength" &&
            "Longitud mínima de 6 caracteres"}
          <input
            type="submit"
            value="Crear Cuenta"
            id="submit"
            className="btn-all"
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
