import { useEffect, useState } from "react";
import { Modal, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function Citas() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const url = "http://localhost:3001/api/appointments";
  const [citas, setCitas] = useState([]);
  const [mascota, setMascota] = useState("");
  const [codPpal, setCodPpal] = useState("");
  const [codSec, setCodSec] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const getCitas = async () => {
    const response = await axios.get(url);
    setCitas(response.data);
  };

  useEffect(() => {
    getCitas();
  }, []);

  const addAppointment = () => {
    axios
      .post(url, {
        FECHA: fecha,
        HORA_INICIO: horaInicio,
        HORA_FIN: horaFin,
        OBSERVACIONES: observaciones,
        ID_TIPO_CONSULTA: tipoConsulta,
        ID_MASCOTAS: mascota,
        ID_TRATAMIENTO: tratamiento,
        ID_COD_DIAGNOSTICO_PRINCIPAL: codPpal,
        ID_COD_DIAGNOSTICO_SECUNDARIO: codSec,
      })
      .then(() => {
        alert("Cita registrada correctamente");
        getCitas();
        handleClose();
      })
      .catch(() => {
        alert("Error al registar cita");
      });
  };

  //Opciones formulario

  const deleteCita = (id) => {
    if (window.confirm("¿Está seguro de eliminar esta cita?")) {
      axios
        .delete(`${url}/${id}`)
        .then(() => {
          alert("Cita eliminada correctamente");
          getCitas();
        })
        .catch(() => {
          alert("Error al eliminar cita");
        });
    }
  };

  return (
    <>
      <div className="container-fluid m-0">
        <p className="text-center h2 fw-bold mt-3">Citas</p>
        <Table striped bordered className="mt-3">
          <thead>
            <tr className="text-center">
              <th>No.</th>
              <th>MASCOTA</th>
              <th>ESPECIE</th>
              <th className="w-20">DIAGNÓSTICO PRINCIPAL</th>
              <th className="w-20">DIAGNÓSTICO SECUNDARIO</th>
              <th>FECHA</th>
              <th>HORA INICIO</th>
              <th>HORA FIN</th>
              <th className="w-15">TIPO CONSULTA</th>
              <th>TRATAMIENTO</th>
              <th>OBSERVACIONES</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((d, i) => (
              <tr key={i} className="text-center">
                <td>{d.ID_CITAS}</td>
                <td>{d.MASCOTA}</td>
                <td>{d.ESPECIE}</td>
                <td>{d.CODIGO_DIAG_PRINCIPAL}</td>
                <td>{d.CODIGO_DIAG_SECUNDARIO}</td>
                <td>{formatDate(d.FECHA)}</td>
                <td>{d.HORA_INICIO}</td>
                <td>{d.HORA_FIN}</td>
                <td>{d.NOMBRE_CONSULTA}</td>
                <td>{d.TRATAMIENTO}</td>
                <td>{d.OBSERVACIONES}</td>
                <td>
                  <Button className="btn-sm btn-dark">
                    <FaEdit />
                  </Button>
                  <Button
                    className="btn-sm btn-danger ms-2"
                    onClick={() => deleteCita(d.ID_CITAS)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button className="btn-lg btn-dark" onClick={handleShow}>
          Registrar cita
        </Button>
      </div>

      <div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Registrar cita</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mt-3">
                <Form.Label>Fecha de la cita</Form.Label>
                <Form.Control type="date"></Form.Control>
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Hora de inicio</Form.Label>
                <Form.Control type="time"></Form.Control>
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Hora de fin</Form.Label>
                <Form.Control type="time"></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="mt-3">Observaciones</Form.Label>
                <Form.Select>
                  <option>Seleccione una opción</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label className="mt-3">Tipo de consulta</Form.Label>
                <Form.Select>
                  <option>Seleccione una opción</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label className="mt-3">
                  A que mascota se le realizó la consulta?
                </Form.Label>
                <Form.Select>
                  <option>Seleccione una opción</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label className="mt-3">Tratamiento</Form.Label>
                <Form.Select>
                  <option>Seleccione una opción</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label className="mt-3">Diagnóstico Principal</Form.Label>
                <Form.Select>
                  <option>Seleccione una opción</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label className="mt-3">Diagnóstico Secundario</Form.Label>
                <Form.Select>
                  <option>Seleccione una opción</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Volver
            </Button>
            <Button variant="primary" onClick={addAppointment}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Citas;
