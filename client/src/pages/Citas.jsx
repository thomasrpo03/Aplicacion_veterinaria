import { useEffect, useState } from "react";
import { Modal, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function Clientes() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // const openModal = (
  //   op,
  //   id,
  //   tipoIdenficacion,
  //   documento,
  //   nombres,
  //   apellidos,
  //   barrio,
  //   direccion,
  //   email,
  //   telefono
  // ) => {
  //   setId("");
  //   setTipoIdenficacion("");
  //   setDocumento("");
  //   setNombres("");
  //   setApellidos("");
  //   setBarrio("");
  //   setDireccion("");
  //   setEmail("");
  //   setTelefono("");
  //   setOperation("");
  //   if (op === 1) {
  //     setTitle("Nuevo Cliente");
  //   } else if (op === 2) {
  //     setTitle("Editar Cliente");
  //     setId(id);
  //     setTipoIdenficacion(tipoIdenficacion);
  //     setDocumento(documento);
  //     setNombres(nombres);
  //     setApellidos(apellidos);
  //     setBarrio(barrio);
  //     setDireccion(direccion);
  //     setEmail(email);
  //     setTelefono(telefono);
  //   }
  //   window.setTimeout(function () {
  //     document.getElementById("documento").focus();
  //   }, 500);
  // };

  const url = "http://localhost:3001/api/clients";
  const [clientes, setClientes] = useState([]);
  const [id, setId] = useState("");
  const [tipoIdentificacion, setTipoIdenficacion] = useState("");
  const [documento, setDocumento] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [barrio, setBarrio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [operation, setOperation] = useState("");
  const [title, setTitle] = useState("");

  const getClients = async () => {
    const response = await axios.get(url);
    setClientes(response.data);
  };

  useEffect(() => {
    getClients();
  }, []);

  const urlTipoDocumento = "http://localhost:3001/api/tipodocumento";
  const [tipoDocumento, setTipoDocumento] = useState("");

  useEffect(() => {
    axios.get(urlTipoDocumento).then((response) => {
      setTipoDocumento(response.data);
    });
  }, []);

  const addClient = () => {
    axios
      .post(url, {
        ID_TIPO_IDENTIFICACION: tipoIdentificacion,
        NUMERO_IDENTIFICACION: documento,
        NOMBRES: nombres,
        APELLIDOS: apellidos,
        BARRIO: barrio,
        DIRECCION: direccion,
        EMAIL: email,
        TELEFONO: telefono,
      })
      .then(() => {
        alert("Cliente agregado correctamente");
        getClients();
        handleClose();
      })
      .catch(() => {
        alert("Error al agregar cliente");
      });
  };

  const deleteClient = (id) => {
    if (window.confirm("¿Está seguro de eliminar este cliente?")) {
      axios
        .delete(`${url}/${id}`)
        .then(() => {
          alert("Cliente eliminado correctamente");
          getClients();
        })
        .catch(() => {
          alert("Error al eliminar cliente");
        });
    }
  };

  return (
    <>
      <div className="container-fluid m-1">
        <p className="text-center h2 fw-bold mt-3">Nuestras mascotas</p>
        <Table striped bordered className="mt-3">
          <thead>
            <tr className="text-center">
              <th>No.</th>
              <th>No. DOCUMENTO</th>
              <th>NOMBRES</th>
              <th>APELLIDOS</th>
              <th>BARRIO</th>
              <th>DIRECCION</th>
              <th>EMAIL</th>
              <th>TELÉFONO</th>
              <th>ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((d, i) => (
              <tr key={i} className="text-center">
                <td>{d.ID_DUENOS}</td>
                <td>{d.NUMERO_IDENTIFICACION}</td>
                <td>{d.NOMBRES}</td>
                <td>{d.APELLIDOS}</td>
                <td>{d.BARRIO}</td>
                <td>{d.DIRECCION}</td>
                <td>{d.EMAIL}</td>
                <td>{d.TELEFONO}</td>
                <td>
                  <Button className="btn-dark">
                    <FaEdit />
                  </Button>
                  <Button
                    className="btn-danger ms-2"
                    onClick={() => deleteClient(d.ID_DUENOS)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button className="btn-lg btn-dark" onClick={handleShow}>
          Añadir Cliente
        </Button>
      </div>

      <div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label className="mt-3">Tipo de documento</Form.Label>
                <Form.Select
                  value={tipoIdentificacion}
                  onChange={(e) => setTipoIdenficacion(e.target.value)}
                >
                  <option>Seleccione una opción</option>
                  {Array.isArray(tipoDocumento) &&
                    tipoDocumento.map((d) => (
                      <option
                        key={d.ID_TIPO_IDENTIFICACION}
                        value={d.ID_TIPO_IDENTIFICACION}
                      >
                        {d.DESCRIPCION}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>No. Documento</Form.Label>
                <Form.Control
                  type="text"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  type="text"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Barrio</Form.Label>
                <Form.Control
                  type="text"
                  value={barrio}
                  onChange={(e) => setBarrio(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Volver
            </Button>
            <Button variant="primary" onClick={addClient}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Clientes;
