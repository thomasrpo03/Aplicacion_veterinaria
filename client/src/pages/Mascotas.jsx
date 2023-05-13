import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Col, Input, Button, Table } from "reactstrap";
import axios from "axios";
import { FaEdit, FaTrash, FaArrowUp } from "react-icons/fa";

const url = "http://localhost:3001/api/pets";
const raceOptionsUrl = "http://localhost:3001/api/raceoptions";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const Mascotas = () => {
  const [nombre, setNombre] = useState("");
  const [peso, setPeso] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [idRaza, setIdRaza] = useState("");
  const [idDueno, setIdDueno] = useState("");
  const [id, setId] = useState(0);

  const [pets, setPets] = useState([]);

  const getPets = () => {
    axios.get(url).then((response) => {
      setPets(response.data);
    });
  };

  useEffect(() => {
    getPets();
  }, []);

  const [opcionesRaza, setOpcionesRaza] = useState([]);

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
        DUENOS_ID: idDueno,
      })
      .then(() => {
        alert("Mascota agregada correctamente");
        getPets();
        cleanInputs();
      })
      .catch(() => {
        alert("Error al agregar mascota");
      });
  };

  const deleteMascotas = (id) => {
    if (window.confirm("¿Está seguro de eliminar esta mascota?")) {
      axios
        .delete(`${url}/${id}`)
        .then(() => {
          alert("Mascota eliminada correctamente");
          getPets();
        })
        .catch(() => {
          alert("Error al eliminar mascota");
        });
    }
  };

  const updateMascota = () => {
    axios
      .put(`${url}/${id}`, {
        ID_MASCOTAS: id,
        NOMBRE: nombre,
        PESO: peso,
        FECHA_NACIMIENTO: fechaNacimiento,
        SEXO: sexo,
        ID_RAZA: idRaza,
        DUENOS_ID: idDueno,
      })
      .then(() => {
        alert("Mascota actualizada correctamente");
        getPets();
        cleanInputs();
      })
      .catch(() => {
        alert("Error al actualizar mascota");
      });
  };

  const [editar, setEditar] = useState(false);

  const editMascota = (val) => {
    setEditar(true);

    setNombre(val.NOMBRE);
    setPeso(val.PESO);
    setFechaNacimiento(val.FECHA_NACIMIENTO);
    setSexo(val.SEXO);
    setIdRaza(val.ID_RAZA);
    setIdDueno(val.DUENOS_ID);
    setId(val.ID_MASCOTAS);
  };

  const cleanInputs = () => {
    setNombre("");
    setPeso("");
    setFechaNacimiento("");
    setSexo("");
    setIdRaza("");
    setIdDueno("");

    setId("");

    setEditar(false);
  };

  return (
    <div className="content m-3">
      <div className="card ">
        <div className="card-header h2 fw-bold text-center">Añadir Mascota</div>
        <div className="card-body">
          <Form className="m-4">
            <FormGroup row>
              <Label for="NOMBRE" sm={2} style={{ fontSize: "1.3rem" }}>
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
                  value={nombre}
                  required
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="PESO" sm={2} style={{ fontSize: "1.3rem" }}>
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
                  value={peso}
                  required
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="FECHA_NACIMIENTO"
                sm={2}
                style={{ fontSize: "1.3rem" }}
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
                  value={fechaNacimiento}
                  required
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="sexo" sm={2} style={{ fontSize: "1.3rem" }}>
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
                  value={sexo}
                  required
                >
                  <option>Seleccione una opción</option>
                  <option value="MACHO">Macho</option>
                  <option value="HEMBRA">Hembra</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="ID_RAZA" sm={2} style={{ fontSize: "1.3rem" }}>
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
                  value={idRaza}
                  required
                >
                  <option>Seleccione una opción</option>
                  {opcionesRaza.map((val) => (
                    <option key={val.ID_RAZA} value={val.ID_RAZA}>
                      {val.DESCRIPCION}
                    </option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="DUENOS_ID" sm={2} style={{ fontSize: "1.3rem" }}>
                Documento del Dueño
              </Label>
              <Col sm={10}>
                <Input
                  type="input"
                  name="DUENOS_ID"
                  id="DUENOS_ID"
                  onChange={(event) => {
                    setIdDueno(event.target.value);
                  }}
                  value={idDueno}
                  required
                ></Input>
              </Col>
            </FormGroup>
          </Form>
        </div>
        <div className="card-footer text-muted">
          <div className="d-flex justify-content-center">
            {editar ? (
              <div>
                <Button className="btn-lg btn-dark" onClick={updateMascota}>
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
              <Button className="btn-lg btn-dark" onClick={addMascota}>
                Guardar
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="card mt-3 ">
        <div className="card-header h2 fw-bold text-center">
          Listado de Mascotas
        </div>
        <div className="card-body">
          <Table striped bordered className="mt-3">
            <thead>
              <tr className="text-center h5">
                <th>No.</th>
                <th>NOMBRE</th>
                <th>PESO</th>
                <th>FECHA DE NACIMIENTO</th>
                <th>SEXO</th>
                <th>RAZA</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((val, i) => (
                <tr key={i} className="text-center">
                  <td>{val.ID_MASCOTAS}</td>
                  <td>{val.NOMBRE}</td>
                  <td>{val.PESO}</td>
                  <td>{formatDate(val.FECHA_NACIMIENTO)}</td>
                  <td>{val.SEXO}</td>
                  <td>{val.RAZA}</td>
                  <td>
                    <Button
                      className="btn-dark"
                      onClick={() => {
                        editMascota(val);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      className="btn-danger ms-2"
                      onClick={() => deleteMascotas(val.ID_MASCOTAS)}
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

export default Mascotas;
