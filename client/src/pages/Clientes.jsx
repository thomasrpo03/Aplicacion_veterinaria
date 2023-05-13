import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Col, Input, Button, Table } from "reactstrap";
import axios from "axios";
import { FaEdit, FaTrash, FaArrowUp } from "react-icons/fa";

const url = "http://localhost:3001/api/clients";
const docTypyeUrl = "http://localhost:3001/api/tipodocumento";

const Clientes = () => {
  const [id, setId] = useState("");
  const [idDoc, setIdDoc] = useState("");
  const [numDoc, setNumDoc] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const [clients, setClients] = useState([]);

  const getClients = () => {
    axios.get(url).then((response) => {
      setClients(response.data);
    });
  };

  useEffect(() => {
    getClients();
  }, []);

  const [docType, setDocType] = useState([]);

  useEffect(() => {
    axios.get(docTypyeUrl).then((response) => {
      setDocType(response.data);
    });
  }, []);

  const addCliente = () => {
    axios
      .post(url, {
        ID_TIPO_IDENTIFICACION: idDoc,
        NUMERO_IDENTIFICACION: numDoc,
        NOMBRES: nombres,
        APELLIDOS: apellidos,
        DIRECCION: direccion,
        EMAIL: email,
        TELEFONO: telefono,
      })
      .then(() => {
        alert("Cliente agregado con exito");
        getClients();
        cleanInputs();
      })
      .catch(() => {
        alert("Error al agregar cliente");
      });
  };

  const deleteCliente = (id) => {
    if (window.confirm("¿Está seguro de eliminar este cliente?")) {
      axios
        .delete(`${url}/${id}`)
        .then(() => {
          alert("Cliente eliminado correctamente");
        })
        .catch(() => {
          alert("Error al eliminar cliente");
        });
    }
  };

  const updateCliente = () => {
    axios
      .put(`${url}/${id}`, {
        ID_DUENOS: id,
        ID_TIPO_IDENTIFICACION: idDoc,
        NUMERO_IDENTIFICACION: numDoc,
        NOMBRES: nombres,
        APELLIDOS: apellidos,
        DIRECCION: direccion,
        EMAIL: email,
        TELEFONO: telefono,
      })
      .then(() => {
        alert("Cliente actualizado correctamente");
        getClients();
        cleanInputs();
      })
      .catch(() => {
        alert("Error al actualizar cliente");
      });
  };

  const [editar, setEditar] = useState(false);

  const editCliente = (val) => {
    setEditar(true);

    setIdDoc(val.ID_TIPO_IDENTIFICACION);
    setNumDoc(val.NUMERO_IDENTIFICACION);
    setNombres(val.NOMBRES);
    setApellidos(val.APELLIDOS);
    setDireccion(val.DIRECCION);
    setEmail(val.EMAIL);
    setTelefono(val.TELEFONO);
    setId(val.ID_DUENOS);
  };

  const cleanInputs = () => {
    setId("");
    setIdDoc("");
    setNumDoc("");
    setNombres("");
    setApellidos("");
    setDireccion("");
    setEmail("");
    setTelefono("");

    setEditar(false);
  };

  return (
    <div className="content m-3">
      <div className="card ">
        <div className="card-header h2 fw-bold text-center">Añadir Dueño</div>
        <div className="card-body">
          <Form className="m-4">
            <FormGroup row>
              <Label
                for="ID_TIPO_IDENTIFICACION"
                sm={2}
                style={{ fontSize: "1.3rem" }}
              >
                Tipo de Documento
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="ID_TIPO_IDENTIFICACION"
                  id="ID_TIPO_IDENTIFICACION"
                  onChange={(event) => {
                    setIdDoc(event.target.value);
                  }}
                  value={idDoc}
                  required
                >
                  <option>Seleccione una opción</option>
                  {docType.map((val) => (
                    <option
                      key={val.ID_TIPO_IDENTIFICACION}
                      value={val.ID_TIPO_IDENTIFICACION}
                    >
                      {val.DESCRIPCION}
                    </option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="NUMERO_IDENTIFICACION"
                sm={2}
                style={{ fontSize: "1.3rem" }}
              >
                No. Documento
              </Label>
              <Col sm={10}>
                <Input
                  type="input"
                  name="NUMERO_IDENTIFICACION"
                  id="NUMERO_IDENTIFICACION"
                  onChange={(event) => {
                    setNumDoc(event.target.value);
                  }}
                  value={numDoc}
                  required
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="NOMBRES" sm={2} style={{ fontSize: "1.3rem" }}>
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
                  value={nombres}
                  required
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="APELLIDOS" sm={2} style={{ fontSize: "1.3rem" }}>
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
                  value={apellidos}
                  required
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="DIRECCION" sm={2} style={{ fontSize: "1.3rem" }}>
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
                  value={direccion}
                  required
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="EMAIL" sm={2} style={{ fontSize: "1.3rem" }}>
                Correo Electrónico
              </Label>
              <Col sm={10}>
                <Input
                  placeholder="@ejemlo.com"
                  type="email"
                  name="EMAIL"
                  id="EMAIL"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  value={email}
                  required
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="TELEFONO" sm={2} style={{ fontSize: "1.3rem" }}>
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
                  value={telefono}
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
                <Button className="btn-lg btn-dark" onClick={updateCliente}>
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
              <Button className="btn-lg btn-dark" onClick={addCliente}>
                Guardar
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-header h2 fw-bold text-center">
          Listado de Clientes
        </div>
        <div className="card-body">
          <Table striped bordered className="mt-3">
            <thead>
              <tr className="text-center h5">
                <th>No.</th>
                <th>DOCUMENTO</th>
                <th>NOMBRES</th>
                <th>APELLIDOS</th>
                <th>DIRECCION</th>
                <th>EMAIL</th>
                <th>TELEFONO</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((val, i) => (
                <tr key={i} className="text-center">
                  <td>{val.ID_DUENOS}</td>
                  <td>{val.NUMERO_IDENTIFICACION}</td>
                  <td>{val.NOMBRES}</td>
                  <td>{val.APELLIDOS}</td>
                  <td>{val.DIRECCION}</td>
                  <td>{val.EMAIL}</td>
                  <td>{val.TELEFONO}</td>
                  <td>
                    <Button
                      className="btn-dark"
                      onClick={() => {
                        editCliente(val);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      className="btn-danger ms-2"
                      onClick={() => deleteCliente(val.ID_DUENOS)}
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
             Volver arriba<FaArrowUp className="ms-2"/>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Clientes;
