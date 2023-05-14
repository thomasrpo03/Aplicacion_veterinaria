import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import { FaEye, FaArrowUp } from "react-icons/fa";

const urlAllBills = "http://localhost:3001/api/bills/";

const Facturacion = () => {
  const [allBills, setAllBills] = useState([]);

  const getAllBills = async () => {
    axios.get(urlAllBills).then((response) => {
      setAllBills(response.data);
    });
  };

  useEffect(() => {
    getAllBills();
  }, []);

  const [modal, setModal] = useState(false);

  const toggleModal = (idFacturacion) => {
    const bill = allBills.find((val) => val.ID_FACTURACION === idFacturacion);
    setSelectedBill(bill);
    setModal(!modal);
  };

  const [selectedBill, setSelectedBill] = useState(null);

  return (
    <div className="content m-3">
      <div className="card">
        <div className="card-header h2 fw-bold text-center">Facturación</div>
        <div className="card-body">
          <Table striped bordered className="mt-3">
            <thead>
              <tr className="text-center h5">
                <th>No.</th>
                <th>MASCOTA</th>
                <th>DUEÑO</th>
                <th>DURACIÓN</th>
                <th>VALOR TOTAL</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {allBills.map((val, i) => (
                <tr key={i} className="text-center">
                  <td>{val.ID_FACTURACION}</td>
                  <td>{val.NOMBRE}</td>
                  <td>{val.NOMBRE_COMPLETO}</td>
                <td>{val.DURACION} Hrs</td>
                  <td>
                    {val.VALOR_TOTAL.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </td>

                  <td>
                    <Button
                      className="btn btn-dark "
                      onClick={() => toggleModal(val.ID_FACTURACION)}
                    >
                      Detalles <FaEye className="ms-3" />
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
      <Modal isOpen={modal} toggle={toggleModal} size="xl">
        <ModalHeader toggle={toggleModal}>Detalles de la Factura</ModalHeader>
        <ModalBody>
          <div className="card">
            <div className="card-header h4 fw-bold text-center">
              Información del Cliente
            </div>
            <div className="card-body">
              <Table striped bordered>
                <thead>
                  <tr className="text-center">
                    <th>NOMBRE COMPLETO</th>
                    <th>No. DOCUMENTO</th>
                    <th>DIRECCIÓN</th>
                    <th>BARRRIO</th>
                    <th>CORREO ELECTRÓNICO</th>
                    <th>TELÉFONO</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBill && (
                    <tr className="text-center">
                      <td>{selectedBill.NOMBRE_COMPLETO}</td>
                      <td>{selectedBill.NUMERO_IDENTIFICACION}</td>
                      <td>{selectedBill.DIRECCION}</td>
                      <td>{selectedBill.BARRIO}</td>
                      <td>{selectedBill.EMAIL}</td>
                      <td>{selectedBill.TELEFONO}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-header h4 fw-bold text-center">
              Información de la Mascota
            </div>
            <div className="card-body">
              <Table striped bordered>
                <thead>
                  <tr className="text-center">
                    <th>NOMBRE</th>
                    <th>RAZA</th>
                    <th>SEXO</th>
                    <th>PESO</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBill && (
                    <tr className="text-center">
                      <td>{selectedBill.NOMBRE}</td>
                      <td>{selectedBill.RAZA}</td>
                      <td>{selectedBill.SEXO}</td>
                      <td>{selectedBill.PESO}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-header h4 fw-bold text-center">
              Información de la Cita
            </div>
            <div className="card-body">
              <Table striped bordered>
                <thead>
                  <tr className="text-center">
                    <th>No. FACTURA</th>
                    <th>FECHA DE LA CITA</th>
                    <th>HORA INICIO</th>
                    <th>HORA FIN</th>
                    <th>DURACION</th>
                    <th>ESTADO</th>
                    <th>VALOR A PAGAR</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBill && (
                    <tr className="text-center">
                      <td>{selectedBill.ID_FACTURACION}</td>
                      <td>
                        {new Date(selectedBill.FECHA).toLocaleDateString(
                          "es-CO",
                          { day: "2-digit", month: "2-digit", year: "numeric" }
                        )}
                      </td>

                      <td>{selectedBill.HORA_INICIO}</td>
                      <td>{selectedBill.HORA_FIN}</td>
                      <td>{selectedBill.DURACION} Hrs</td>
                      <td>{selectedBill.ESTADO_FACTURA}</td>
                      <td>
                        {selectedBill.VALOR_TOTAL.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                        })}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Facturacion;
