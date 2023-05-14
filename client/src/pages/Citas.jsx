import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Col, Input, Button, Table } from "reactstrap";
import axios from "axios";
import { FaEdit, FaTrash, FaArrowUp } from "react-icons/fa";

const url = "http://localhost:3001/api/appointments";
const urlQueryType = "http://localhost:3001/api/querytype";
const urlPetName = "http://localhost:3001/api/petname";
const urlTreatmentName = "http://localhost:3001/api/treatment";
const urlDiagnosis = "http://localhost:3001/api/diagnosis";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const Citas = () => {
  const [idCita, setIdCita] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");
  const [idMascota, setIdMascota] = useState("");
  const [idTratamiento, setIdTratamiento] = useState("");
  const [idDiagPpal, setIdDiagPpal] = useState("");
  const [idDiagSec, setIdDiagSec] = useState("");

  const [citas, setCitas] = useState([]);

  const getCitas = async () => {
    axios.get(url).then((response) => {
      setCitas(response.data);
    });
  };

  useEffect(() => {
    getCitas();
  }, []);

  const [queryType, setQueryType] = useState([]);
  const [petName, setPetName] = useState([]);
  const [treatmentName, setTratmentName] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);

  useEffect(() => {
    axios.get(urlQueryType).then((response) => {
      setQueryType(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(urlPetName).then((response) => {
      setPetName(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(urlTreatmentName).then((response) => {
      setTratmentName(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(urlDiagnosis).then((response) => {
      setDiagnosis(response.data);
    });
  }, []);

  const addCita = () => {
    axios
      .post(url, {
        FECHA: fecha,
        HORA_INICIO: horaInicio,
        HORA_FIN: horaFin,
        OBSERVACIONES: observaciones,
        ID_TIPO_CONSULTA: tipoConsulta,
        ID_MASCOTAS: idMascota,
        ID_TRATAMIENTO: idTratamiento,
        ID_COD_DIAGNOSTICO_PRINCIPAL: idDiagPpal,
        ID_COD_DIAGNOSTICO_SECUNDARIO: idDiagSec,
      })
      .then(() => {
        alert("Cita registrada con exito");
        getCitas();
        cleanInputs();
      })
      .catch(() => {
        alert("Error al registrar la cita");
      });
  };

  const deleteCita = (id) => {
    if (window.confirm("¿Seguro que desea eliminar esta cita?")) {
      axios
        .delete(`${url}/${id}`)
        .then(() => {
          alert("Cita eliminada con exito");
          getCitas();
        })
        .catch(() => {
          alert("Error al eliminar la cita");
        });
    }
  };

  const updateCita = () => {
    axios
      .put(`${url}/${idCita}`, {
        ID_CITAS: idCita,
        FECHA: fecha,
        HORA_INICIO: horaInicio,
        HORA_FIN: horaFin,
        OBSERVACIONES: observaciones,
        ID_TIPO_CONSULTA: tipoConsulta,
        ID_MASCOTAS: idMascota,
        ID_TRATAMIENTO: idTratamiento,
        ID_COD_DIAGNOSTICO_PRINCIPAL: idDiagPpal,
        ID_COD_DIAGNOSTICO_SECUNDARIO: idDiagSec,
      })
      .then(() => {
        alert("Cita actualizada con exito");
        getCitas();
        cleanInputs();
      })
      .catch(() => {
        alert("Error al actualizar la cita");
      });
  };

  const [editar, setEditar] = useState(false);

  const editCita = (val) => {
    setEditar(true);

    setFecha(val.FECHA);
    setHoraInicio(val.HORA_INICIO);
    setHoraFin(val.HORA_FIN);
    setObservaciones(val.OBSERVACIONES);
    setTipoConsulta(val.ID_TIPO_CONSULTA);
    setIdMascota(val.ID_MASCOTAS);
    setIdTratamiento(val.ID_TRATAMIENTO);
    setIdDiagPpal(val.ID_COD_DIAGNOSTICO_PRINCIPAL);
    setIdDiagSec(val.ID_COD_DIAGNOSTICO_SECUNDARIO);
    setIdCita(val.ID_CITAS);
  };

  const cleanInputs = () => {
    setIdCita("");
    setFecha("");
    setHoraInicio("");
    setHoraFin("");
    setObservaciones("");
    setTipoConsulta("");
    setIdMascota("");
    setIdTratamiento("");
    setIdDiagPpal("");
    setIdDiagSec("");

    setEditar(false);
  };

  return (
    <div className="content m-3">
      <div className="card">
        <div className="card-header h2 fw-bold text-center">Registrar Cita</div>
        <div className="card-body">
          <Form className="m-4">
            <FormGroup row>
              <Label for="FECHA" sm={2} style={{ fontSize: "1.3rem" }}>
                Fecha
              </Label>
              <Col sm={10}>
                <Input
                  type="date"
                  name="FECHA"
                  id="FECHA"
                  onChange={(event) => {
                    setFecha(event.target.value);
                  }}
                  value={fecha}
                  required
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="HORA_INICIO" sm={2} style={{ fontSize: "1.3rem" }}>
                Hora Inicio
              </Label>
              <Col sm={10}>
                <Input
                  type="time"
                  name="HORA_INICIO"
                  id="HORA_INICIO"
                  onChange={(event) => {
                    setHoraInicio(event.target.value);
                  }}
                  value={horaInicio}
                  required
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="HORA_FIN" sm={2} style={{ fontSize: "1.3rem" }}>
                Hora Fin
              </Label>
              <Col sm={10}>
                <Input
                  type="time"
                  name="HORA_FIN"
                  id="HORA_FIN"
                  onChange={(event) => {
                    setHoraFin(event.target.value);
                  }}
                  value={horaFin}
                  required
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="OBSERVACIONES" sm={2} style={{ fontSize: "1.3rem" }}>
                Observaciones
              </Label>
              <Col sm={10}>
                <Input
                  type="textarea"
                  name="OBSERVACIONES"
                  id="OBSERVACIONES"
                  style={{ height: "70px", resize: "none" }}
                  onChange={(event) => {
                    setObservaciones(event.target.value);
                  }}
                  value={observaciones}
                  required
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="ID_TIPO_CONSULTA"
                sm={2}
                style={{ fontSize: "1.3rem" }}
              >
                Tipo de Consulta
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="ID_TIPO_CONSULTA"
                  id="ID_TIPO_CONSULTA"
                  onChange={(event) => {
                    setTipoConsulta(event.target.value);
                  }}
                  value={tipoConsulta}
                  required
                >
                  <option>Seleccione una opción</option>
                  {queryType.map((val) => (
                    <option
                      key={val.ID_TIPO_CONSULTA}
                      value={val.ID_TIPO_CONSULTA}
                    >
                      {val.NOMBRE_CONSULTA}
                    </option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="ID_MASCOTAS" sm={2} style={{ fontSize: "1.3rem" }}>
                Mascota
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="ID_MASCOTAS"
                  id="ID_MASCOTAS"
                  onChange={(event) => {
                    setIdMascota(event.target.value);
                  }}
                  value={idMascota}
                  required
                >
                  <option>Seleccione una opción</option>
                  {petName.map((val) => (
                    <option key={val.ID_MASCOTAS} value={val.ID_MASCOTAS}>
                      {val.NOMBRE}
                    </option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="ID_TRATAMIENTO" sm={2} style={{ fontSize: "1.3rem" }}>
                Tratamiento
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="ID_TRATAMIENTO"
                  id="ID_TRATAMIENTO"
                  onChange={(event) => {
                    setIdTratamiento(event.target.value);
                  }}
                  value={idTratamiento}
                  required
                >
                  <option>Seleccione una opción</option>
                  {treatmentName.map((val) => (
                    <option key={val.ID_TRATAMIENTO} value={val.ID_TRATAMIENTO}>
                      {val.DESCRIPCION}
                    </option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="ID_COD_DIAGNOSTICO_PRINCIPAL"
                sm={2}
                style={{ fontSize: "1.3rem" }}
              >
                Diagnóstico Principal
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="ID_COD_DIAGNOSTICO_PRINCIPAL"
                  id="ID_COD_DIAGNOSTICO_PRINCIPAL"
                  onChange={(event) => {
                    setIdDiagPpal(event.target.value);
                  }}
                  value={idDiagPpal}
                  required
                >
                  <option>Seleccione una opción</option>
                  {diagnosis.map((val) => (
                    <option
                      key={val.ID_COD_DIAGNOSTICO}
                      value={val.ID_COD_DIAGNOSTICO}
                    >
                      {val.CODIGO}
                    </option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="ID_COD_DIAGNOSTICO_SECUNDARIO"
                sm={2}
                style={{ fontSize: "1.3rem" }}
              >
                Diagnóstico Secundario
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="ID_COD_DIAGNOSTICO_SECUNDARIO"
                  id="ID_COD_DIAGNOSTICO_SECUNDARIO"
                  onChange={(event) => {
                    setIdDiagSec(event.target.value);
                  }}
                  value={idDiagSec}
                  required
                >
                  <option>Seleccione una opción</option>
                  {diagnosis.map((val) => (
                    <option
                      key={val.ID_COD_DIAGNOSTICO}
                      value={val.ID_COD_DIAGNOSTICO}
                    >
                      {val.CODIGO}
                    </option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
          </Form>
        </div>
        <div className="card-footer text-muted">
          <div className="d-flex justify-content-center">
            {editar ? (
              <div>
                <Button className="btn-lg btn-dark" onClick={updateCita}>
                  Actualizar
                </Button>
                <Button
                  className="btn-lg btn-danger ms-3"
                  onClick={cleanInputs}
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <Button className="btn-lg btn-dark" onClick={addCita}>
                Guardar
              </Button>
            )}
          </div>
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
                  <td>{formatDate(val.FECHA)}</td>
                  <td>{val.HORA_INICIO}</td>
                  <td>{val.HORA_FIN}</td>
                  <td>{val.NOMBRE_CONSULTA}</td>
                  <td>{val.TRATAMIENTO}</td>
                  <td>{val.OBSERVACIONES}</td>
                  <td>
                    <Button
                      className="btn-dark"
                      onClick={() => {
                        editCita(val);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      className="btn-danger ms-2"
                      onClick={() => {
                        deleteCita(val.ID_CITAS);
                      }}
                    >
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
