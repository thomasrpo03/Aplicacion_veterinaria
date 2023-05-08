import React from "react";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Clientes = () => {
  const [idIdentificacion, setIdIdentificacion] = useState(0);
  const [documento, setDocumento] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [barrio, setBarrio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const addCliente = () => {
    axios
      .post("http://localhost:3001/createduenos", {
        idIdentificacion: idIdentificacion,
        documento: documento,
        nombres: nombres,
        apellidos: apellidos,
        barrio: barrio,
        direccion: direccion,
        email: email,
        telefono: telefono,
      })
      .then(() => {
        alert("Cliente agregado correctamente");
      });
  };

  return (
    <div className="content m-3">
      <div className="d-flex justify-content-center">
        <p class="h1 fw-bold">Añadir un nuevo cliente</p>
      </div>
      <Form className="m-4">
        <FormGroup row>
          <Label
            for="ID_TIPO_IDENTIFICACION"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Tipo de Identificación
          </Label>
          <Col sm={10}>
            <Input
              type="select"
              name="ID_TIPO_IDENTIFICACION"
              id="ID_TIPO_IDENTIFICACION"
              onChange={(event) => {
                setIdIdentificacion(event.target.value);
              }}
            >
              <option value="">Seleccione una opción</option>
              <option value="1">Cédula de Ciudadanía</option>
              <option value="2">Cédula de Extranjería</option>
              <option value="3">Número de Identificación Personal</option>
              <option value="4">Número de Identificación Tributaria</option>
              <option value="5">Tarjeta de Identidad</option>
              <option value="6">Pasaporte</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="NUMERO_IDENTIFICACION"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Número de Documento
          </Label>
          <Col sm={10}>
            <Input
              placeholder="Sin puntos ni espacios"
              type="input"
              name="NUMERO_IDENTIFICACION"
              id="NUMERO_IDENTIFICACION"
              onChange={(event) => {
                setDocumento(event.target.value);
              }}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="NOMBRES"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Nombres
          </Label>
          <Col sm={10}>
            <Input
              type="input"
              name="NOMBRES"
              id="NOMBRES"
              onChange={(event) => {
                setNombres(event.target.value);
              }}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="APELLIDOS"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Apellidos
          </Label>
          <Col sm={10}>
            <Input
              type="input"
              name="APELLIDOS"
              id="APELLIDOS"
              onChange={(event) => {
                setApellidos(event.target.value);
              }}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="BARRIO"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Barrio
          </Label>
          <Col sm={10}>
            <Input
              type="input"
              name="BARRIO"
              id="BARRIO"
              onChange={(event) => {
                setBarrio(event.target.value);
              }}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="DIRECCION"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Dirección
          </Label>
          <Col sm={10}>
            <Input
              type="input"
              name="DIRECCION"
              id="DIRECCION"
              onChange={(event) => {
                setDireccion(event.target.value);
              }}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="EMAIL"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Correo Electrónico
          </Label>
          <Col sm={10}>
            <Input
              type="email"
              name="EMAIL"
              id="EMAIL"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="TELEFONO"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Teléfono
          </Label>
          <Col sm={10}>
            <Input
              type="input"
              name="TELEFONO"
              id="TELEFONO"
              onChange={(event) => {
                setTelefono(event.target.value);
              }}
            ></Input>
          </Col>
        </FormGroup>
        <div className="d-flex justify-content-center">
          <Button className="btn-lg" onClick={addCliente}>
            Guardar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Clientes;
