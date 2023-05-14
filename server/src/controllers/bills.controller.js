import { pool } from "../db.js";

export const getBills = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT d.NUMERO_IDENTIFICACION, CONCAT(d.NOMBRES, ' ', d.APELLIDOS) AS NOMBRE_COMPLETO, d.DIRECCION, d.BARRIO, d.EMAIL, d.TELEFONO, m.NOMBRE, m.PESO, m.SEXO, r.DESCRIPCION AS RAZA, c.FECHA, c.HORA_INICIO, c.HORA_FIN, f.ID_FACTURACION, f.DURACION, f.ESTADO_FACTURA, f.OBSERVACIONES, f.VALOR_TOTAL FROM DUENOS d INNER JOIN MASCOTAS m ON d.ID_DUENOS = m.ID_DUENO INNER JOIN RAZA r ON m.ID_RAZA = r.ID_RAZA INNER JOIN CITAS c ON m.ID_MASCOTAS = c.ID_MASCOTAS INNER JOIN FACTURACION f ON c.ID_CITAS = f.ID_CITAS ORDER BY f.ID_FACTURACION ASC;"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const getBill = async (req, res) => {
    try {
      const [rows] = await pool.query(
        "SELECT F.ID_FACTURACION, m.NOMBRE AS NOMBRE_MASCOTA, CONCAT(d.NOMBRES, ' ', d.APELLIDOS) AS NOMBRE_DUENO, f.DURACION, f.OBSERVACIONES, f.VALOR_TOTAL FROM FACTURACION f INNER JOIN CITAS c ON f.ID_CITAS = c.ID_CITAS INNER JOIN MASCOTAS m ON c.ID_MASCOTAS = m.ID_MASCOTAS INNER JOIN DUENOS d ON m.ID_DUENO = d.ID_DUENOS = ?",
        [req.params.id]
      );
  
      if (rows.length <= 0)
        return res.status(404).json({ message: "Pet not found" });
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Algo salió mal" });
    }
  };