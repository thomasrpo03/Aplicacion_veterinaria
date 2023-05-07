import React from "react";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { useState } from "react";

const Clientes = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");

  const handleChange = (event) => {
    setOpcionSeleccionada(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //falta logica para la conexion
    console.log("La opción seleccionada es:", opcionSeleccionada);
  };

  return (
    <div className="content m-3">
      <Form onSubmit={handleSubmit} className="m-4">
        <h2 className="text-center">Añadir un nuevo Cliente</h2>
        <FormGroup row>
          <Label
            for="ID_TIPO_IDENTIFICACION"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Tipo de identificación
          </Label>
          <Col sm={10}>
            <Input
              type="select"
              name="ID_TIPO_IDENTIFICACION"
              id="ID_TIPO_IDENTIFICACION"
              onChange={handleChange}
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
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
              type="input"
              name="NUMERO_IDENTIFICACION"
              id="NUMERO_IDENTIFICACION"
              onChange={handleChange}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="NOMBRES"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Nombre
          </Label>
          <Col sm={10}>
            <Input
              type="input"
              name="NOMBRES"
              id="NOMBRES"
              onChange={handleChange}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="APELLIDOS"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Apellido
          </Label>
          <Col sm={10}>
            <Input
              type="input"
              name="APELLIDOS"
              id="APELLIDOS"
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="EMAIL"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Correo electrónico
          </Label>
          <Col sm={10}>
            <Input
              type="input"
              name="EMAIL"
              id="EMAIL"
              onChange={handleChange}
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
              onChange={handleChange}
            ></Input>
          </Col>
        </FormGroup>
        <div className="d-flex justify-content-center">
          <Button onClick={handleSubmit} className="btn-lg">
            Guardar
          </Button>
        </div>
      </Form>
      <Form onSubmit={handleSubmit} className="m-4">
        <h2 className="text-center">Añadir una nueva Mascota</h2>
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
              type="input"
              name="NOMBRE"
              id="NOMBRE"
              onChange={handleChange}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="PESO"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Peso (Kg)
          </Label>
          <Col sm={10}>
            <Input
              type="input"
              name="PESO"
              id="PESO"
              onChange={handleChange}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="FECHA_NACIMIENTO"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Fecha de Nacimiento
          </Label>
          <Col sm={10}>
            <Input
              type="input"
              placeholder="aaaa/mm/dd"
              name="FECHA_NACIMIENTO"
              id="FECHA_NACIMIENTO"
              onChange={handleChange}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="SEXO"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Sexo
          </Label>
          <Col sm={10}>
            <Input
              type="select"
              name="SEXO"
              id="SEXO"
              onChange={handleChange}
            >
              <option value="MACHO">Macho</option>
              <option value="HEMBRA">Hembra</option>
            </Input>
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
              onChange={handleChange}
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
              onChange={handleChange}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="EMAIL"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Correo electrónico
          </Label>
          <Col sm={10}>
            <Input
              type="input"
              name="EMAIL"
              id="EMAIL"
              onChange={handleChange}
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
              onChange={handleChange}
            ></Input>
          </Col>
        </FormGroup>
        <div className="d-flex justify-content-center">
          <Button onClick={handleSubmit} className="btn-lg">
            Guardar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Clientes;
