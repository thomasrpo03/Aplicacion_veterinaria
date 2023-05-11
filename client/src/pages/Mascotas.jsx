import React, { useEffect } from "react";
import { Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

const url = "http://localhost:3001/api/pets";

const Mascotas = () => {
  const [mascotas, setMascotas] = React.useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      setMascotas(response.data);
    });
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="m-5">
      <div className="d-flex justify-content-center">
        <p class="h1 fw-bold pb-2">Nuestras Mascotas</p>
      </div>
      <Table striped bordered >
        <thead>
          <tr className="text-center fs-4">
            <th>No.</th>
            <th>Nombre</th>
            <th>Peso</th>
            <th>Fecha de Nacimiento</th>
            <th>Sexo</th>
            <th>Raza</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((d, i) => (
            <tr key={i} className="text-center fs-5">
              <td>{d.ID_MASCOTAS}</td>
              <td>{d.NOMBRE}</td>
              <td>{d.PESO}</td>
              <td>{formatDate(d.FECHA_NACIMIENTO)}</td>
              <td>{d.SEXO}</td>
              <td>{d.ID_RAZA}</td>
              <td className="text-center">
                <NavLink
                  to={`/editmascotas/${d.ID_MASCOTAS}`}
                  className="btn btn-dark"
                >
                  Editar
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <NavLink to="/addmascotas">
        <Button className="btn-lg btn-dark">Añadir Mascota </Button>
      </NavLink>
    </div>
  );
};

export default Mascotas;
