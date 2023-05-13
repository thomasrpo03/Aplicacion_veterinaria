import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Col, Input, Button, Table } from "reactstrap";
import axios from "axios";
import { FaEdit, FaTrash, FaArrowUp } from "react-icons/fa";

const url = "http://localhost:3001/api/appointments";

const Citas = () => {
  const [idCita, setIdCita] = useState("");
  const [mascota, setMascota] = useState("");
  const [especie, setEspecie] = useState("");
  const [codDiagPpal, setCodDiagPpal] = useState("");
  const [codDiagSec, setCodDiagSec] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [citas, setCitas] = useState([]);

  const getCitas = async () => {
    axios.get(url).then((response) => {
      setCitas(response.data);
    });
  };

  useEffect(() => {
    getCitas();
  }, []);

  return (
    <div className="content m-3">
      <div className="card">
        <div className="card-header h2 fw-bold text-center">Registrar Cita</div>
        <div className="card-body"></div>
        <div className="card-footer text-muted">
          <div className="d-flex justify-content-center"></div>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-header h2 fw-bold text-center">Lista de Citas</div>
        <div className="card-body">
          <Table striped bordered>
            <thead>
              <tr className="text-center h5 align-middle">
                <th>No.</th>
                <th>MASCOTA</th>
                <th>ESPECIE</th>
                <th>DIAGÓSTICO PRINCIPAL</th>
                <th>DIAGNÓSTICO SECUNDARIO</th>
                <th>FECHA</th>
                <th>HORA INICIO</th>
                <th>HORA FIN</th>
                <th>TIPO CONSULTA</th>
                <th>TRATAMIENTO</th>
                <th>OBSERVACIONES</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((val, i) => (
                <tr key={i} className="text-center">
                  <td>{val.ID_CITAS}</td>
                  <td>{val.MASCOTA}</td>
                  <td>{val.ESPECIE}</td>
                  <td>{val.CODIGO_DIAG_PRINCIPAL}</td>
                  <td>{val.CODIGO_DIAG_SECUNDARIO}</td>
                  <td>{val.FECHA}</td>
                  <td>{val.HORA_INICIO}</td>
                  <td>{val.HORA_FIN}</td>
                  <td>{val.NOMBRE_CONSULTA}</td>
                  <td>{val.TRATAMIENTO}</td>
                  <td>{val.OBSERVACIONES}</td>
                  <td>
                    <Button className="btn-dark">
                      <FaEdit />
                    </Button>
                    <Button className="btn-danger ms-2">
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="card-footer text-muted d-flex justify-content-end">
          <Button
            className="btn-lg btn-dark"
            onClick={() => window.scrollTo(0, 0)}
          >
            Volver arriba
            <FaArrowUp className="ms-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Citas;
