import { pool } from "../db.js";

export const getPets = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT M.ID_MASCOTAS,M.NOMBRE,M.PESO,M.FECHA_NACIMIENTO,M.SEXO,R.DESCRIPCION AS RAZA, CONCAT(D.NOMBRES,' ',D.APELLIDOS) AS NOMBRE_DUENO FROM mascotas M INNER JOIN raza R ON R.ID_RAZA = M.ID_RAZA INNER JOIN duenos D ON D.ID_DUENOS = M.ID_DUENO ORDER BY ID_MASCOTAS;"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const getPet = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM MASCOTAS WHERE ID_MASCOTAS = ?",
      [req.params.id]
    );

    if (rows.length <= 0)
      return res.status(404).json({ message: "Pet not found" });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const createPet = async (req, res) => {
  try {
    const { NOMBRE, PESO, FECHA_NACIMIENTO, SEXO, ID_RAZA, DUENOS_ID } =
      req.body;

    // Consulta preparada con subconsulta que verifica si el número de identificación existe en la tabla 'duenos'
    const [rows] = await pool.query(
      "INSERT INTO MASCOTAS (NOMBRE,PESO,FECHA_NACIMIENTO,SEXO,ID_RAZA,ID_DUENO ) SELECT ?,?,?,?,?,ID_DUENOS FROM duenos WHERE NUMERO_IDENTIFICACION = ? AND EXISTS (SELECT 1 FROM duenos WHERE NUMERO_IDENTIFICACION = ?);",
      [NOMBRE, PESO, FECHA_NACIMIENTO, SEXO, ID_RAZA, DUENOS_ID, DUENOS_ID]
    );

    // Verificar si se insertó un registro en la tabla 'MASCOTAS'
    if (rows.affectedRows === 0) {
      return res.status(404).json({
        message:
          "El número de identificación proporcionado no se encuentra en la tabla 'duenos'",
      });
    }

    // Devolver los datos de la mascota creada
    res.send({
      id: rows.insertId,
      NOMBRE,
      PESO,
      FECHA_NACIMIENTO,
      SEXO,
      ID_RAZA,
      DUENOS_ID,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const deletePet = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM MASCOTAS WHERE ID_MASCOTAS = ?",
      [req.params.id]
    );

    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Pet not found" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const { NOMBRE, PESO, FECHA_NACIMIENTO, SEXO, ID_RAZA } = req.body;

    const [result] = await pool.query(
      "UPDATE MASCOTAS SET NOMBRE = IFNULL(?, NOMBRE), PESO = IFNULL(?, PESO), FECHA_NACIMIENTO = IFNULL(?, FECHA_NACIMIENTO), SEXO = IFNULL(?, SEXO), ID_RAZA = IFNULL(?, ID_RAZA) WHERE ID_MASCOTAS = ?",
      [NOMBRE, PESO, FECHA_NACIMIENTO, SEXO, ID_RAZA, id]
    );

    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Pet not found" });

    const [rows] = await pool.query(
      "SELECT * FROM MASCOTAS WHERE ID_MASCOTAS = ?",
      [id]
    );

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

//**********  OPCIONES SELECT   **********//

export const getRaceOptions = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT ID_RAZA, DESCRIPCION FROM raza;");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};
