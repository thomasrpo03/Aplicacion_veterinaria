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

//Listener del puerto
app.listen(3001, () => {
  console.log("Server en el puerto 3001");
});
