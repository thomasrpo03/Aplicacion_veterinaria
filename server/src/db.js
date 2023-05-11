import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  user: "nuevo_usuario",
  password: "contraseña",
  port: 3306,
  database: "pruebas_veterinaria",
});
