import React from "react";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { useState } from "react";
import axios from "axios";

const AddCitas = () => {
  const [nombre, setNombre] = useState("");
  const [descipcion, setDescripcion] = useState("");
  const [idDiagPpal, setIdDiagPpal] = useState("");
  const [idDiagSec, setIdDiagSec] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [nombreConsulta, setNombreConsulta] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const addCita = () => {
    axios
      .post("http://localhost:3001/addcitas", {
        nombre: nombre,
        descipcion: descipcion,
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
        alert("Cliente agregado correctamente");
      })
      .catch(() => {
        alert("Error al agregar cliente");
      });
  };

  return (
    <div className="content m-3">
      <div className="d-flex justify-content-center">
        <p className="h1 fw-bold">Registrar Cita</p>
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
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="DESCRIPCION"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Especie
          </Label>
          <Col sm={10}>
            <Input
              placeholder="Sin puntos ni espacios"
              type="select"
              name="DESCRIPCION"
              id="DESCRIPCION"
              onChange={(event) => {
                setDescripcion(event.target.value);
              }}
            ></Input>
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
            ></Input>
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
            ></Input>
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
            ></Input>
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
              type="input"
              name="TRATAMIENTO"
              id="TRATAMIENTO"
              onChange={(event) => {
                setTratamiento(event.target.value);
              }}
            ></Input>
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
