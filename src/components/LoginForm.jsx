import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "../CSS/App.css";

const LoginForm = ({ darAcceso }) => {
  // let URL = process.env.REACT_APP_BACKEND_URL + "/docente/login";
  const navegar = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const enterUser = async () => {
    await axios
      .post("https://fast-envoy-361708.wl.r.appspot.com/api/docente/login", {
        email: Email,
        password: Password,
      })
      .then((resp) => {
        console.log("Login correcto");
        // console.log(resp.data.token);
        // console.log(resp.data.userId);
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
        alert("error de credenciales");
      });

    if (Email.trim() === "" || Password.trim() === "") {
      return;
    }
    setEmail("");
    setPassword("");
  };

  const gestorEmail = (e) => {
    setEmail(e.target.value);
  };
  const gestorPassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {}, []);

  return (
    <div style={{ marginTop: 200 }}>
      <form className="Form">
        <h1 className="title" style={{ marginTop: 40 }}>
          Login Now...
        </h1>
        <div>
          <input
            className="input-all"
            type="email"
            placeholder="Email"
            id="email"
            value={Email}
            onChange={gestorEmail}
            required={true}
          />
        </div>
        <div>
          <input
            className="input-all"
            type="password"
            placeholder="Password"
            id="password"
            value={Password}
            onChange={gestorPassword}
            required={true}
          />
        </div>
        <div>
          <Button type="Button" onClick={enterUser} className="btn-all">
            Submit
          </Button>
        </div>
      </form>

      <div></div>
    </div>
  );
};

export default LoginForm;
