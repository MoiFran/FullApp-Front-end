import React from "react";
import { useState } from "react";
import Buscar from "./Buscar";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import Img1 from "../imgs/bak1.jpg";
import Img2 from "../imgs/bak2.jpg";
import Img3 from "../imgs/bannerbg.jpg";

const Inicio = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Img1}
            alt="First slide"
            style={{ width: "70%", height: "700px" }}
          />
          <Carousel.Caption>
            <h3>los mejores cursos </h3>
            <p>El futuro te espera </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Img2}
            alt="Second slide"
            style={{ width: "70%", height: "700px" }}
          />

          <Carousel.Caption>
            <h3>Cerftificados internacionales</h3>
            <p>hasta en el espacio reconoceran tus conocimientos</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Img3}
            alt="Third slide"
            style={{ width: "70%", height: "700px" }}
          />

          <Carousel.Caption>
            <h3>El saber es el placer mas grande</h3>
            <p>
              Amplia tus conocimientos y conviertete e un profecional mas
              competitivo
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Buscar />
    </div>
  );
};

export default Inicio;
