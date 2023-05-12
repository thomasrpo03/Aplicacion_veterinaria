import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Col, Input, Button, Table } from "reactstrap";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const url = "http://localhost:3001/api/pets";
const raceOptionsUrl = "http://localhost:3001/api/raceoptions";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const AddMascotas = () => {
  const [nombre, setNombre] = useState("");
  const [peso, setPeso] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [idRaza, setIdRaza] = useState("");
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
      })
      .then(() => {
        alert("Mascota agregada correctamente");
        getPets();
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
      })
      .then(() => {
        alert("Mascota actualizada correctamente");
        getPets();
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
    setId(val.ID_MASCOTAS);
  };

  return (
    <div className="content m-3">
      <div className="card text-center">
        <div className="card-header h2 fw-bold">Añadir Mascota</div>
        <div className="card-body">
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
                  value={nombre}
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
                  value={peso}
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
                  value={fechaNacimiento}
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
                  value={sexo}
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
                  value={idRaza}
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
          </Form>
        </div>
        <div className="card-footer text-muted">
          <div className="d-flex justify-content-center">
            {editar ? (
              <div>
                <Button className="btn-lg btn-dark" onClick={updateMascota}>
                  Actualizar
                </Button>
                <Button className="btn-lg btn-danger ms-3" onClick={addMascota}>
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
      <div className="card mt-3 text-center">
        <div className="card-header h2 fw-bold">Listado de Mascotas</div>
        <div className="card-body">
          <Table striped bordered className="mt-3">
            <thead>
              <tr className="text-center">
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
        <div className="card-footer text-muted">
          <Button
            className="btn-lg btn-dark"
            onClick={() => window.scrollTo(0, 0)}
          >
            <i className="fas fa-chevron-up"></i> Volver arriba
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMascotas;
