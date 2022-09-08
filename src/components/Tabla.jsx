//import './Tabla.css';

const Tabla = ({ datos }) => {
  console.log(datos);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {datos.map((dato) => {
        return (
          <div
            className="Card-docente"
            style={{
              width: "300px",
              padding: 20,
              marginRight: "20px",
            }}
          >
            <h2> Curso: {dato.nombre}</h2>
            <h3>{dato.horas} Horas</h3>
            <h3> Docente: {dato.docente.nombre}</h3>
            <h3>{dato.precio}€</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Tabla;
