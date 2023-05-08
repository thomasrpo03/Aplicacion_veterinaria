import React from "react";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const AddMascotas = () => {
  const [nombre, setNombre] = useState("");
  const [peso, setPeso] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [idRaza, setIdRaza] = useState("");

  const addMascota = () => {
    axios
      .post("http://localhost:3001/createmascotas", {
        nombre: nombre,
        peso: peso,
        fechaNacimiento: fechaNacimiento,
        sexo: sexo,
        idRaza: idRaza,
      })
      .then(() => {
        alert("Mascota agregada correctamente");
      });
  };

  return (
    <div className="content m-3">
      <div className="d-flex justify-content-center">
        <p class="h1 fw-bold">Añadir una nueva mascota</p>
      </div>
      <Form className="m-4">
        <FormGroup row>
          <Label
            for="NOMBRE"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Nombre
          </Label>
          <Col sm={10}>
            <Input
              type="input"
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
              onChange={(event) => {
                setPeso(event.target.value);
              }}
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
              name="FECHA_NACIMIENTO"
              id="FECHA_NACIMIENTO"
              onChange={(event) => {
                setFechaNacimiento(event.target.value);
              }}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="sexo"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Sexo
          </Label>
          <Col sm={10}>
            <Input
              type="select"
              name="sexo"
              id="sexo"
              onChange={(event) => {
                setSexo(event.target.value);
              }}
            >
              <option value={"MACHO"}>Macho</option>
              <option value={"HEMBRA"}>Hembra</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="ID_RAZA"
            sm={2}
            style={{ fontSize: "1.3rem", textAlign: "center" }}
          >
            Raza
          </Label>
          <Col sm={10}>
            <Input
              type="input"
              name="ID_RAZA"
              id="ID_RAZA"
              onChange={(event) => {
                setIdRaza(event.target.value);
              }}
            ></Input>
          </Col>
        </FormGroup>
        <div className="d-flex justify-content-center">
          <Button className="btn-lg" onClick={addMascota}>
            Guardar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddMascotas;
