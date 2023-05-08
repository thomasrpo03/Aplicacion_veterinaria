import React, { useEffect } from "react";
import { Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Inicio = () => {
  const [mascotas, setMascotas] = React.useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/listmascotas").then((response) => {
      setMascotas(response.data);
    });
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="m-4">
      <div className="d-flex justify-content-center">
        <p class="h1 fw-bold pb-2">Nuestras Mascotas</p>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th className="text-center">No.</th>
            <th className="text-center">Nombre</th>
            <th className="text-center">Peso</th>
            <th className="text-center">Fecha de Nacimiento</th>
            <th className="text-center">Sexo</th>
            <th className="text-center">Raza</th>
            <th className="text-center">Dueño</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((d, i) => (
            <tr key={i}>
              <td>{d.ID_MASCOTAS}</td>
              <td>{d.NOMBRE}</td>
              <td>{d.PESO}</td>
              <td>{formatDate(d.FECHA_NACIMIENTO)}</td>
              <td>{d.SEXO}</td>
              <td>{d.RAZA}</td>
              <td>{d.DUENO}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <NavLink to="/addmascotas">
        <Button className="btn-lg btn-primary">Añadir Mascota </Button>
      </NavLink>
    </div>
  )
};

export default Inicio;
