import { useEffect, useState } from "react";
import { Modal, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const url = "http://localhost:3001/api/pets";
const raceOptionsUrl = "http://localhost:3001/api/raceoptions";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

function Mascotas() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [opcionesRaza, setOpcionesRaza] = useState([]);

  useEffect(() => {
    axios.get(raceOptionsUrl).then((response) => {
      setOpcionesRaza(response.data);
    });
  }, []);

  const [pets, setPets] = useState([]);

  const refreshPets = () => {
    axios.get(url).then((response) => {
      setPets(response.data);
    });
  };

  useEffect(() => {
    refreshPets();
  }, []);

  const [nombre, setNombre] = useState("");
  const [peso, setPeso] = useState("");
  const [fecha, setFecha] = useState("");
  const [sexo, setSexo] = useState("");
  const [raza, setRaza] = useState("");

  const addMascota = () => {
    axios
      .post(url, {
        NOMBRE: nombre,
        PESO: peso,
        FECHA_NACIMIENTO: fecha,
        SEXO: sexo,
        ID_RAZA: raza,
      })
      .then(() => {
        alert("Mascota agregada correctamente");
        refreshPets();
        handleClose();
      })
      .catch(() => {
        alert("Error al agregar mascota");
      });
  };

  return (
    <>
      <div className="container-fluid m-1">
        <p className="text-center h2 fw-bold mt-3">Nuestras mascotas</p>
        <Table striped bordered className="mt-3">
          <thead>
            <tr className="text-center">
              <th>No.</th>
              <th>NOMBRE</th>
              <th>PESO</th>
              <th>FECHA DE NACIMIENTO</th>
              <th>SEXO</th>
              <th>RAZA</th>
              <th>ACCION</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((d, i) => (
              <tr key={i} className="text-center">
                <td>{d.ID_MASCOTAS}</td>
                <td>{d.NOMBRE}</td>
                <td>{d.PESO}</td>
                <td>{formatDate(d.FECHA_NACIMIENTO)}</td>
                <td>{d.SEXO}</td>
                <td>{d.RAZA}</td>
                <td>
                  <Button className="btn-lg btn-dark">
                    <FaEdit />
                  </Button>
                  <Button className="btn-lg btn-danger ms-2">
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button className="btn-lg btn-dark" onClick={handleShow}>
          Añadir Mascota
        </Button>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Añadir una nueva mascota</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => {
                    setNombre(event.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Peso (Kg)</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => {
                    setPeso(event.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(event) => {
                    setFecha(event.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-3">Sexo</Form.Label>
                <Form.Select
                  onChange={(event) => {
                    setSexo(event.target.value);
                  }}
                >
                  <option>Seleccione una opción</option>
                  <option value="MACHO">Macho</option>
                  <option value="HEMBRA">Hembra</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-3">Raza</Form.Label>
                <Form.Select
                  onChange={(event) => {
                    setRaza(event.target.value);
                  }}
                >
                  <option>Seleccione una opción</option>
                  {opcionesRaza.map((d) => (
                    <option key={d.ID_RAZA} value={d.ID_RAZA}>
                      {d.DESCRIPCION}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Volver
            </Button>
            <Button variant="primary" onClick={addMascota}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Mascotas;
