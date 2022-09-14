import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const Docente = ({ name, ...props }) => {
  let URL = process.env.REACT_APP_BACKEND_URL;
  const extraerDatosDeUsuario = () => {
    const datosRecuperar = JSON.parse(localStorage.getItem("DatosUsuario"));

    if (datosRecuperar && datosRecuperar.token) {
      // Si existe algo que recuperar y dentro de lo recuperado existe la propiedad token

      return [datosRecuperar.token, datosRecuperar.userId];
    }
  };
  const navegar = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [docente, setDocente] = useState([]);
  const getDocente = async () => {
    const data = await axios.get(
      URL + "/docente/" + extraerDatosDeUsuario()[1]
    );
    setDocente(data.data.docente);
  };
  const [nombre, setNombre] = useState(docente.nombre);
  const [email, setEmail] = useState(docente.email);

  const gestorNombreDocente = (e) => {
    setNombre(e.target.value);
  };
  const gestorEmailDocente = (e) => {
    setEmail(e.target.value);
  };

  const modificarDocente = async () => {
    await axios
      .patch(
        URL + `/docente/${docente._id}`,
        {
          nombre: nombre,
          email: email,
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
        handleClose();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getDocente();
  }, []);
  return (
    <div>
      <Button variant="light" onClick={handleShow} className="me-1">
        Editar
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement={"start"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Modificar perfil</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: 200,
              padding: 20,
              alignItems: "center",
            }}
          >
            <input
              className="input-all"
              type="text"
              value={nombre}
              placeholder={docente.nombre}
              onChange={gestorNombreDocente}
            />
            <input
              className="input-all"
              type="text"
              value={email}
              placeholder={docente.email}
              onChange={gestorEmailDocente}
            />
            <Button
              type="Button"
              onClick={modificarDocente}
              style={{ marginTop: 20, marginLeft: 60 }}
            >
              Modificar
            </Button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Docente;

function Example() {
  return (
    <>
      {["top"].map((placement, idx) => (
        <Docente key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

<Example />;
