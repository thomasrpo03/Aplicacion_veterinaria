import { pool } from "../db.js";

export const getClients = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT ID_DUENOS, NUMERO_IDENTIFICACION, NOMBRES, APELLIDOS, DIRECCION, EMAIL, TELEFONO FROM duenos ORDER BY Id_duenos ASC;"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const getClient = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM duenos WHERE ID_duenos = ?",
      [req.params.id]
    );

    if (rows.length <= 0)
      return res.status(404).json({ message: "Client not found" });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const createClient = async (req, res) => {
  try {
    const {
      ID_TIPO_IDENTIFICACION,
      NUMERO_IDENTIFICACION,
      NOMBRES,
      APELLIDOS,
      DIRECCION,
      EMAIL,
      TELEFONO,
    } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO DUENOS (ID_TIPO_IDENTIFICACION, NUMERO_IDENTIFICACION, NOMBRES, APELLIDOS, DIRECCION, EMAIL, TELEFONO) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        ID_TIPO_IDENTIFICACION,
        NUMERO_IDENTIFICACION,
        NOMBRES,
        APELLIDOS,
        DIRECCION,
        EMAIL,
        TELEFONO,
      ]
    );

    res.send({
      id: rows.insertId,
      NUMERO_IDENTIFICACION,
      NOMBRES,
      APELLIDOS,
      DIRECCION,
      EMAIL,
      TELEFONO,
      ID_TIPO_IDENTIFICACION,
    });
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM DUENOS WHERE ID_DUENOS = ?",
      [req.params.id]
    );

    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Client not found" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      NUMERO_IDENTIFICACION,
      NOMBRES,
      APELLIDOS,
      BARRIO,
      DIRECCION,
      EMAIL,
      TELEFONO,
      ID_TIPO_IDENTIFICACION,
    } = req.body;

    const [result] = await pool.query(
      "UPDATE DUENOS SET NUMERO_IDENTIFICACION = IFNULL(?, NUMERO_IDENTIFICACION),NOMBRES = IFNULL(?, NOMBRES), APELLIDOS = IFNULL(?, APELLIDOS), BARRIO = IFNULL(?, BARRIO), DIRECCION = IFNULL(?, DIRECCION), EMAIL = IFNULL(?, EMAIL), TELEFONO = IFNULL(?, TELEFONO), ID_TIPO_IDENTIFICACION = IFNULL(?, ID_TIPO_IDENTIFICACION) WHERE ID_DUENOS = ?",
      [
        NUMERO_IDENTIFICACION,
        NOMBRES,
        APELLIDOS,
        BARRIO,
        DIRECCION,
        EMAIL,
        TELEFONO,
        ID_TIPO_IDENTIFICACION,
        id,
      ]
    );

    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Client not found" });

    const [rows] = await pool.query(
      "SELECT * FROM DUENOS WHERE ID_DUENOS = ?",
      [id]
    );

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const getTipoDocumento = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT ID_TIPO_IDENTIFICACION, DESCRIPCION FROM tipo_identificacion;"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};
