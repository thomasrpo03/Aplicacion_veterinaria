import { pool } from "../db.js";

export const getPets = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT M.ID_MASCOTAS, M.NOMBRE, M.PESO, M.FECHA_NACIMIENTO, M.SEXO, R.DESCRIPCION AS RAZA FROM MASCOTAS M INNER JOIN RAZA R ON M.ID_RAZA = R.ID_RAZA ORDER BY ID_MASCOTAS;"
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
    const { NOMBRE, PESO, FECHA_NACIMIENTO, SEXO, ID_RAZA } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO MASCOTAS (NOMBRE,PESO,FECHA_NACIMIENTO,SEXO,ID_RAZA ) VALUES (?, ?, ?, ?, ?)",
      [NOMBRE, PESO, FECHA_NACIMIENTO, SEXO, ID_RAZA]
    );
    res.send({
      id: rows.insertId,
      NOMBRE,
      PESO,
      FECHA_NACIMIENTO,
      SEXO,
      ID_RAZA,
    });
  } catch (error) {
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
