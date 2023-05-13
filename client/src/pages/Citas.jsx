import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Col, Input, Button, Table } from "reactstrap";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const url = "http://localhost:3001/api/appointments";

const Citas = () => {
  const [idCita, setIdCita] = useState("");
  const [mascota, setMascota] = useState("");
  const [especie, setEspecie] = useState("");
  const [codDiagPpal, setCodDiagPpal] = useState("");
  const [codDiagSec, setCodDiagSec] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [citas, setCitas] = useState([]);

  const getCitas = async () => {
    axios.get(url).then((response) => {
      setCitas(response.data);
    });
  };

  useEffect(() => {
    getCitas();
  }, []);


  
  return <div>Citas</div>;
};

export default Citas;
