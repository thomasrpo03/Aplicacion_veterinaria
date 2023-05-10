import React, { useEffect } from "react";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { useState } from "react";
import axios from "axios";

const AddCitas = () => {
  const [nombre, setNombre] = useState("");
  const [idDiagPpal, setIdDiagPpal] = useState("");
  const [idDiagSec, setIdDiagSec] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [nombreConsulta, setNombreConsulta] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [mascotas, setMascotas] = useState([]);
  const [codigo, setCodigo] = useState([]);
  const [tipoConsulta, setTipoConsulta] = useState([]);
  const [opcionesTratamiento, setOpcionesTratamiento] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/opcionesmascotas").then((response) => {
      setMascotas(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/opcionescodigo").then((response) => {
      setCodigo(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/opcionesconsulta").then((response) => {
      setTipoConsulta(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/opcionestratamiento").then((response) => {
      setOpcionesTratamiento(response.data);
    });
  }, []);

  const addCita = () => {
    axios
      .post("http://localhost:3001/addcitas", {
        nombre: nombre,
        idDiagPpal: idDiagPpal,
        idDiagSec: idDiagSec,
        fecha: fecha,
        horaInicio: horaInicio,
        horaFin: horaFin,
        nombreConsulta: nombreConsulta,
        tratamiento: tratamiento,
        observaciones: observaciones,
      })
      .then(() => {
        alert("Cita registrada correctamente");
      })
      .catch(() => {
        alert("Error al registrar cita");
      });
  };

  return (
    <div className="content m-3">
      <div className="d-flex justify-content-center">
        <p className="h1 fw-bold">Registrar Cita</p>
      </div>
      <div className="d-flex justify-content-center">
        <p>Recuerde que para registrar una cita primero debe</p>
        <a href="/addmascotas" target="_blank" className="ms-1">
          registrar una mascota
        </a>
        <p className="ms-1">y</p>
        <a href="/addclientes" target="_blank" className="ms-1">
          registrar un cliente
        </a>
      </div>
      <Form className="m-4">
        <FormGroup row>
          <Label
            for="NOMBRE"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Nombre de la Mascota
          </Label>
          <Col sm={10}>
            <Input
              type="select"
              name="NOMBRE"
              id="NOMBRE"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
            >
              <option value="SELECCIONE UNA OPCION">
                Seleccione una opción
              </option>
              {mascotas.map((d) => (
                <option key={d.NOMBRE} value={d.NOMBRE}>
                  {d.NOMBRE}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="ID_DIAGNOSTICO_PRINCIPAL"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Diagnóstico Principal
          </Label>
          <Col sm={10}>
            <Input
              type="select"
              name="ID_DIAGNOSTICO_PRINCIPAL"
              id="ID_DIAGNOSTICO_PRINCIPAL"
              onChange={(event) => {
                setIdDiagPpal(event.target.value);
              }}
            >
              <option value="SELECCIONE UNA OPCION">
                Seleccione una opción
              </option>
              {codigo.map((d) => (
                <option key={d.ID_COD_DIAGNOSTICO} value={d.ID_COD_DIAGNOSTICO}>
                  {d.DESCRIPCION}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="ID_DIAGNOSTICO_SECUNDARIO"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Diagnóstico Secundario
          </Label>
          <Col sm={10}>
            <Input
              type="select"
              name="ID_DIAGNOSTICO_SECUNDARIO"
              id="ID_DIAGNOSTICO_SECUNDARIO"
              onChange={(event) => {
                setIdDiagSec(event.target.value);
              }}
            >
              <option value="SELECCIONE UNA OPCION">
                Seleccione una opción
              </option>
              {codigo.map((d) => (
                <option key={d.ID_COD_DIAGNOSTICO} value={d.ID_COD_DIAGNOSTICO}>
                  {d.DESCRIPCION}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="FECHA"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
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
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="HORA_INICIO"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
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
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="HORA_FIN"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
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
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="NOMBRE_CONSULTA"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Tipo de Consulta
          </Label>
          <Col sm={10}>
            <Input
              type="select"
              name="NOMBRE_CONSULTA"
              id="NOMBRE_CONSULTA"
              onChange={(event) => {
                setNombreConsulta(event.target.value);
              }}
            >
              <option value="SELECCIONE UNA OPCION">
                Seleccione una opción
              </option>
              {tipoConsulta.map((d) => (
                <option key={d.ID_TIPO_CONSULTA} value={d.ID_TIPO_CONSULTA}>
                  {d.NOMBRE_CONSULTA}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="TRATAMIENTO"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Tratamiento
          </Label>
          <Col sm={10}>
            <Input
              type="select"
              name="TRATAMIENTO"
              id="TRATAMIENTO"
              onChange={(event) => {
                setTratamiento(event.target.value);
              }}
            >
              <option value="SELECCIONE UNA OPCION">
                Seleccione una opción
              </option>
              {opcionesTratamiento.map((d) => (
                <option key={d.ID_TRATAMIENTO} value={d.ID_TRATAMIENTO}>
                  {d.DESCRIPCION}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="OBSERVACIONES"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Observaciones
          </Label>
          <Col sm={10}>
            <Input
              type="textarea"
              name="OBSERVACIONES"
              id="OBSERVACIONES"
              onChange={(event) => {
                setObservaciones(event.target.value);
              }}
              style={{ height: "100px", resize: "none" }}
            ></Input>
          </Col>
        </FormGroup>
        <div className="d-flex justify-content-center">
          <Button className="btn-lg" onClick={addCita}>
            Guardar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddCitas;
