import { pool } from "../db.js";

export const getAppointments = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT c.ID_CITAS, m.NOMBRE AS MASCOTA, e.DESCRIPCION AS ESPECIE, cd1.CODIGO AS CODIGO_DIAG_PRINCIPAL,  cd2.CODIGO AS CODIGO_DIAG_SECUNDARIO, c.FECHA, c.HORA_INICIO, c.HORA_FIN, tc.NOMBRE_CONSULTA, t.DESCRIPCION AS TRATAMIENTO, c.OBSERVACIONES FROM CITAS c  INNER JOIN MASCOTAS m ON c.ID_MASCOTAS = m.ID_MASCOTAS INNER JOIN RAZA r ON m.ID_RAZA = r.ID_RAZA INNER JOIN ESPECIE e ON r.ID_ESPECIE = e.ID_ESPECIE INNER JOIN TRATAMIENTO t ON c.ID_TRATAMIENTO = t.ID_TRATAMIENTO INNER JOIN COD_DIAGNOSTICO cd1 ON c.ID_COD_DIAGNOSTICO_PRINCIPAL = cd1.ID_COD_DIAGNOSTICO INNER JOIN COD_DIAGNOSTICO cd2 ON c.ID_COD_DIAGNOSTICO_SECUNDARIO = cd2.ID_COD_DIAGNOSTICO INNER JOIN TIPO_CONSULTA tc ON c.ID_TIPO_CONSULTA = tc.ID_TIPO_CONSULTA;"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const getAppointment = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT c.ID_CITAS, m.NOMBRE AS MASCOTA, e.DESCRIPCION AS ESPECIE, cd1.CODIGO AS CODIGO_DIAG_PRINCIPAL,  cd2.CODIGO AS CODIGO_DIAG_SECUNDARIO, c.FECHA, c.HORA_INICIO, c.HORA_FIN, tc.NOMBRE_CONSULTA, t.DESCRIPCION AS TRATAMIENTO, c.OBSERVACIONES FROM CITAS c  INNER JOIN MASCOTAS m ON c.ID_MASCOTAS = m.ID_MASCOTAS INNER JOIN RAZA r ON m.ID_RAZA = r.ID_RAZA INNER JOIN ESPECIE e ON r.ID_ESPECIE = e.ID_ESPECIE INNER JOIN TRATAMIENTO t ON c.ID_TRATAMIENTO = t.ID_TRATAMIENTO INNER JOIN COD_DIAGNOSTICO cd1 ON c.ID_COD_DIAGNOSTICO_PRINCIPAL = cd1.ID_COD_DIAGNOSTICO INNER JOIN COD_DIAGNOSTICO cd2 ON c.ID_COD_DIAGNOSTICO_SECUNDARIO = cd2.ID_COD_DIAGNOSTICO INNER JOIN TIPO_CONSULTA tc ON c.ID_TIPO_CONSULTA = tc.ID_TIPO_CONSULTA WHERE ID_CITAS = ?",
      [req.params.id]
    );

    if (rows.length <= 0)
      return res.status(404).json({ message: "Client not found" });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const {
      FECHA,
      HORA_INICIO,
      HORA_FIN,
      OBSERVACIONES,
      ID_TIPO_CONSULTA,
      ID_MASCOTAS,
      ID_TRATAMIENTO,
      ID_COD_DIAGNOSTICO_PRINCIPAL,
      ID_COD_DIAGNOSTICO_SECUNDARIO,
    } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO CITAS (FECHA, HORA_INICIO, HORA_FIN,OBSERVACIONES, ID_TIPO_CONSULTA,ID_MASCOTAS,ID_TRATAMIENTO,ID_COD_DIAGNOSTICO_PRINCIPAL,ID_COD_DIAGNOSTICO_SECUNDARIO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        FECHA,
        HORA_INICIO,
        HORA_FIN,
        OBSERVACIONES,
        ID_TIPO_CONSULTA,
        ID_MASCOTAS,
        ID_TRATAMIENTO,
        ID_COD_DIAGNOSTICO_PRINCIPAL,
        ID_COD_DIAGNOSTICO_SECUNDARIO,
      ]
    );

    res.send({
      id: rows.insertId,
      FECHA,
      HORA_INICIO,
      HORA_FIN,
      OBSERVACIONES,
      ID_TIPO_CONSULTA,
      ID_MASCOTAS,
      ID_TRATAMIENTO,
      ID_COD_DIAGNOSTICO_PRINCIPAL,
      ID_COD_DIAGNOSTICO_SECUNDARIO,
    });
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};
