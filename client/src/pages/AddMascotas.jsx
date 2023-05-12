import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:3001/api/pets";
const raceOptionsUrl = "http://localhost:3001/api/raceoptions";

const AddMascotas = () => {
  const [nombre, setNombre] = useState("");
  const [peso, setPeso] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [idRaza, setIdRaza] = useState("");

  const [opcionesRaza, setOpcionesRaza] = useState([]);

  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  useEffect(() => {
    axios.get(raceOptionsUrl).then((response) => {
      setOpcionesRaza(response.data);
    });
  }, []);

  const addMascota = () => {
    axios
      .post(url, {
        NOMBRE: nombre,
        PESO: peso,
        FECHA_NACIMIENTO: fechaNacimiento,
        SEXO: sexo,
        ID_RAZA: idRaza,
      })
      .then(() => {
        alert("Mascota agregada correctamente");
      })
      .catch(() => {
        alert("Error al agregar mascota");
      });
  };
  return (
    <div className="content m-3">
      <div className="d-flex justify-content-center">
        <p className="h1 fw-bold">Añadir una nueva mascota</p>
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
              type="date"
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
              <option value="NOSELECCIONADO">Seleccione una opción</option>
              <option value="MACHO">Macho</option>
              <option value="HEMBRA">Hembra</option>
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
              type="select"
              name="ID_RAZA"
              id="ID_RAZA"
              onChange={(event) => {
                setIdRaza(event.target.value);
              }}
            >
              <option value="SELECCIONE UNA OPCION">
                Seleccione una opción
              </option>
              {opcionesRaza.map((d) => (
                <option key={d.ID_RAZA} value={d.ID_RAZA}>
                  {d.DESCRIPCION}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <div className="d-flex justify-content-center">
          <Button className="btn-lg btn-dark" onClick={addMascota}>
            Guardar
          </Button>
          <button className="btn btn-lg btn-secondary ms-3" onClick={handleClick}>Volver</button>
        </div>
      </Form>
    </div>
  );
};

export default AddMascotas;
