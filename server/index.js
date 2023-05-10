const e = require("express");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  database: "pruebas_veterinaria",
  user: "nuevo_usuario",
  password: "contraseña",
});

//Metodos citas
app.get("/listcitas", (req, res) => {
  db.query(
    "SELECT c.ID_CITAS, m.NOMBRE AS MASCOTA, e.DESCRIPCION AS ESPECIE, cd1.CODIGO AS CODIGO_DIAG_PRINCIPAL,  cd2.CODIGO AS CODIGO_DIAG_SECUNDARIO, c.FECHA, c.HORA_INICIO, c.HORA_FIN, tc.NOMBRE_CONSULTA, t.DESCRIPCION AS TRATAMIENTO, c.OBSERVACIONES FROM CITAS c  INNER JOIN MASCOTAS m ON c.ID_MASCOTAS = m.ID_MASCOTAS INNER JOIN RAZA r ON m.ID_RAZA = r.ID_RAZA INNER JOIN ESPECIE e ON r.ID_ESPECIE = e.ID_ESPECIE INNER JOIN TRATAMIENTO t ON c.ID_TRATAMIENTO = t.ID_TRATAMIENTO INNER JOIN COD_DIAGNOSTICO cd1 ON c.ID_COD_DIAGNOSTICO_PRINCIPAL = cd1.ID_COD_DIAGNOSTICO INNER JOIN COD_DIAGNOSTICO cd2 ON c.ID_COD_DIAGNOSTICO_SECUNDARIO = cd2.ID_COD_DIAGNOSTICO INNER JOIN TIPO_CONSULTA tc ON c.ID_TIPO_CONSULTA = tc.ID_TIPO_CONSULTA",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/addcitas", (req, res) => {
  const nombre = req.body.nombre;
  const idDiagPpal = req.body.idDiagPpal;
  const idDiagSec = req.body.idDiagSec;
  const fecha = req.body.fecha;
  const horaInicio = req.body.horaInicio;
  const horaFin = req.body.horaFin;
  const nombreConsulta = req.body.nombreConsulta;
  const tratamiento = req.body.tratamiento;
  const observaciones = req.body.observaciones;

  db.query(
    "CALL SP_AGREGAR_CITAS(?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      nombre,
      idDiagPpal,
      idDiagSec,
      fecha,
      horaInicio,
      horaFin,
      nombreConsulta,
      tratamiento,
      observaciones,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al registrar la cita");
      } else {
        console.log("Registro de cita exitoso");
        res.status(200).send("Cita registrada con éxito");
      }
    }
  );
});

app.get("/opcionesmascotas", (req, res) => {
  db.query("SELECT NOMBRE FROM mascotas;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/opcionescodigo", (req, res) => {
  db.query(
    "SELECT ID_COD_DIAGNOSTICO, DESCRIPCION FROM cod_diagnostico;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/opcionesconsulta", (req, res) => {
  db.query(
    "SELECT ID_TIPO_CONSULTA, NOMBRE_CONSULTA FROM tipo_consulta;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/opcionestratamiento", (req, res) => {
  db.query(
    "SELECT ID_TRATAMIENTO, DESCRIPCION FROM tratamiento;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//Metodos dueños
app.get("/listduenos", (req, res) => {
  db.query(
    "SELECT DUENOS.ID_DUENOS, TIPO_IDENTIFICACION.DESCRIPCION AS TIPO_IDENTIFICACION, DUENOS.NUMERO_IDENTIFICACION, DUENOS.NOMBRES, DUENOS.APELLIDOS, DUENOS.BARRIO, DUENOS.DIRECCION, DUENOS.EMAIL, DUENOS.TELEFONO FROM duenos INNER JOIN TIPO_IDENTIFICACION ON DUENOS.ID_TIPO_IDENTIFICACION = TIPO_IDENTIFICACION.ID_TIPO_IDENTIFICACION ORDER BY DUENOS.ID_DUENOS",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/createduenos", (req, res) => {
  const idIdentificacion = req.body.idIdentificacion;
  const documento = req.body.documento;
  const nombres = req.body.nombres;
  const apellidos = req.body.apellidos;
  const barrio = req.body.barrio;
  const direccion = req.body.direccion;
  const email = req.body.email;
  const telefono = req.body.telefono;

  db.query(
    "CALL SP_AGREGAR_DUENOS(?, ?, ?, ?, ?, ?, ?, ?)",
    [
      idIdentificacion,
      documento,
      nombres,
      apellidos,
      barrio,
      direccion,
      email,
      telefono,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al crear el cliente");
      } else {
        console.log("Registro de cliente exitoso mi papá");
        res.status(200).send("Cliente creado exitosamente");
      }
    }
  );
});

app.get("/opcionesidentificacion", (req, res) => {
  db.query("SELECT DESCRIPCION FROM tipo_identificacion;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Metodos Mascotas
app.post("/createmascotas", (req, res) => {
  const nombre = req.body.nombre;
  const peso = req.body.peso;
  const fechaNacimiento = req.body.fechaNacimiento;
  const sexo = req.body.sexo;
  const idRaza = req.body.idRaza;

  db.query(
    "CALL SP_AGREGAR_MASCOTAS(?, ?, ?, ?, ?)",
    [nombre, peso, fechaNacimiento, sexo, idRaza],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al crear el mascota");
      } else {
        console.log("Registro de mascota exitoso mi papácho");
        res.status(200).send("Mascota creada exitosamente");
      }
    }
  );
});

app.get("/listmascotas", (req, res) => {
  db.query(
    "SELECT M.ID_MASCOTAS, M.NOMBRE, M.PESO, M.FECHA_NACIMIENTO, M.SEXO, R.DESCRIPCION AS RAZA, CONCAT(D.NOMBRES, ' ', D.APELLIDOS) AS DUENO FROM MASCOTAS M INNER JOIN RAZA R ON M.ID_RAZA = R.ID_RAZA INNER JOIN DUENOS_MASCOTAS DM ON M.ID_MASCOTAS = DM.ID_MASCOTAS INNER JOIN DUENOS D ON DM.ID_DUENOS = D.ID_DUENOS;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/opcionessexo", (req, res) => {
  db.query("", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/opcionesraza", (req, res) => {
  db.query("SELECT ID_RAZA, DESCRIPCION FROM raza;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Listener del puerto
app.listen(3001, () => {
  console.log("Server en el puerto 3001");
});
