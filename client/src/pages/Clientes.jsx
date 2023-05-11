import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/listduenos").then((response) => {
      setClientes(response.data);
    });
  }, []);

  return (
    <div className="m-4">
      <div className="d-flex justify-content-center">
        <p class="h1 fw-bold pb-2">Nuestros Clientes</p>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th className="text-center">No.</th>
            <th className="text-center">Tipo de Identificación</th>
            <th className="text-center">No. Documento</th>
            <th className="text-center">Nombres</th>
            <th className="text-center">Apellidos</th>
            <th className="text-center">Barrio</th>
            <th className="text-center">Dirección</th>
            <th className="text-center">Correo Electróniico</th>
            <th className="text-center">Teléfono</th>
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
        <Button className="btn-lg btn-primary">Añadir Cliente </Button>
      </NavLink>
    </div>
  );
};

export default Clientes;
