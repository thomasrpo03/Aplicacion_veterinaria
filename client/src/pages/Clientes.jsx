import React, { useEffect } from "react";
import { Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Clientes = () => {
  const [clientes, setClientes] = React.useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/listduenos").then((response) => {
      setClientes(response.data);
    });
  }, []);
  console.log(clientes);

  return (
    <div className="m-4">
      <div className="d-flex justify-content-center">
        <p class="h1 fw-bold pb-2">Nuestros Clientes</p>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>No.1</th>
            <th>Tipo de Identificación</th>
            <th>No. Documento</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Barrio</th>
            <th>Dirección</th>
            <th>Correo Electróniico</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((d, i) => (
            <tr key={i}>
              <td>{d.ID_DUENOS}</td>
              <td>{d.TIPO_IDENTIFICACION}</td>
              <td>{d.NUMERO_IDENTIFICACION}</td>
              <td>{d.NOMBRES}</td>
              <td>{d.APELLIDOS}</td>
              <td>{d.BARRIO}</td>
              <td>{d.DIRECCION}</td>
              <td>{d.EMAIL}</td>
              <td>{d.TELEFONO}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <NavLink to="/addclientes">
        <Button className="btn btn-primary">Añadir Cliente </Button>
      </NavLink>
    </div>
  );
};

export default Clientes;
