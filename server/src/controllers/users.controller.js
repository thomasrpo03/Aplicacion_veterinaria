import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  const { user, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE user = ? AND password = ?;",
      [user, password]
    );

    if (rows.length > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};
