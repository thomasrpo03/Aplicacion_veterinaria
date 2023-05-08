import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

const Citas = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/listcitas").then((response) => {
      setCitas(response.data);
    });
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="m-4">
      <div className="d-flex justify-content-center">
        <p class="h1 fw-bold pb-2">Citas Agendadas/Finalizadas</p>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th className="text-center">No.</th>
            <th className="text-center">Mascota</th>
            <th className="text-center">Especie</th>
            <th className="text-center">Diagnóstico Principal</th>
            <th className="text-center">Diagnóstico Secundario</th>
            <th className="text-center">Fecha</th>
            <th className="text-center">Hora de Inicio</th>
            <th className="text-center">Hora de Fin</th>
            <th className="text-center">Tipo de Consulta</th>
            <th className="text-center">Tratamiento</th>
            <th className="text-center">Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((d, i) => (
            <tr key={i}>
              <td>{d.ID_CITAS}</td>
              <td>{d.MASCOTA}</td>
              <td>{d.ESPECIE}</td>
              <td>{d.CODIGO_DIAG_PRINCIPAL}</td>
              <td>{d.CODIGO_DIAG_SECUNDARIO}</td>
              <td>{formatDate(d.FECHA)}</td>
              <td>{d.HORA_INICIO}</td>
              <td>{d.HORA_FIN}</td>
              <td>{d.NOMBRE_CONSULTA}</td>
              <td>{d.TRATAMIENTO}</td>
              <td>{d.OBSERVACIONES}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <NavLink to="/addcitas">
        <Button className="btn-lg btn-primary">Nueva Cita</Button>
      </NavLink>
    </div>
  );
};

export default Citas;
