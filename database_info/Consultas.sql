SELECT * FROM citas;

SELECT ID_CITAS, DATE_FORMAT(FECHA, '%Y-%m-%d') AS FECHA, HORA_INICIO, HORA_FIN, OBSERVACIONES, ID_TIPO_CONSULTA, ID_MASCOTAS, ID_TRATAMIENTO, ID_COD_DIAGNOSTICO_PRINCIPAL, ID_COD_DIAGNOSTICO_SECUNDARIO 
FROM CITAS;

SELECT MASCOTAS.NOMBRE AS Mascota, ESPECIE.DESCRIPCION AS Especie, COD_DIAGNOSTICO.CODIGO AS 'Codigo de Diagnóstico', CITAS.FECHA, CITAS.HORA_INICIO AS 'Hora Inicio', CITAS.HORA_FIN AS 'Hora Fin', TIPO_CONSULTA.NOMBRE_CONSULTA AS 'Tipo de Consulta', TRATAMIENTO.DESCRIPCION AS Tratamiento, CITAS.OBSERVACIONES FROM CITAS 
INNER JOIN MASCOTAS ON CITAS.ID_MASCOTAS = MASCOTAS.ID_MASCOTAS 
INNER JOIN RAZA ON MASCOTAS.ID_RAZA = RAZA.ID_RAZA 
INNER JOIN ESPECIE ON RAZA.ID_ESPECIE = ESPECIE.ID_ESPECIE 
INNER JOIN TIPO_CONSULTA ON CITAS.ID_TIPO_CONSULTA = TIPO_CONSULTA.ID_TIPO_CONSULTA 
LEFT JOIN TRATAMIENTO ON CITAS.ID_TRATAMIENTO = TRATAMIENTO.ID_TRATAMIENTO 
LEFT JOIN COD_DIAGNOSTICO ON CITAS.ID_COD_DIAGNOSTICO_PRINCIPAL = COD_DIAGNOSTICO.ID_COD_DIAGNOSTICO;

SELECT MASCOTAS.NOMBRE AS MASCOTA, ESPECIE.DESCRIPCION AS ESPECIE, COD_DIAGNOSTICO.CODIGO AS `CODIGO_DIAGNOSTICO`, CITAS.FECHA, CITAS.HORA_INICIO, CITAS.HORA_FIN, TIPO_CONSULTA.NOMBRE_CONSULTA AS `TIPO_DE_CONSULTA`, TRATAMIENTO.DESCRIPCION AS `TRATAMIENTO`, CITAS.OBSERVACIONES FROM citas INNER JOIN MASCOTAS ON CITAS.ID_MASCOTAS = MASCOTAS.ID_MASCOTAS INNER JOIN RAZA ON MASCOTAS.ID_RAZA = RAZA.ID_RAZA INNER JOIN ESPECIE ON RAZA.ID_ESPECIE = ESPECIE.ID_ESPECIE INNER JOIN COD_DIAGNOSTICO ON CITAS.ID_COD_DIAGNOSTICO_PRINCIPAL = COD_DIAGNOSTICO.ID_COD_DIAGNOSTICO INNER JOIN TIPO_CONSULTA ON CITAS.ID_TIPO_CONSULTA = TIPO_CONSULTA.ID_TIPO_CONSULTA LEFT JOIN TRATAMIENTO ON CITAS.ID_TRATAMIENTO = TRATAMIENTO.ID_TRATAMIENTO;



INSERT INTO citas (FECHA,HORA_INICIO,HORA_FIN,OBSERVACIONES)
VALUES (STR_TO_DATE('03-06-2000','%d-%m-%Y'),'11:11:11','10:10:10','PRUEBA');

INSERT INTO CITAS (FECHA, HORA_INICIO, HORA_FIN, OBSERVACIONES, ID_TIPO_CONSULTA, ID_MASCOTAS, ID_TRATAMIENTO, ID_COD_DIAGNOSTICO_PRINCIPAL) 
VALUES ('200-06-03', '11:11:11', '10:10:10', 'Observaciones de la cita', ID_TIPO_CONSULTA, 
(SELECT ID_MASCOTAS FROM MASCOTAS WHERE NOMBRE = 'Nombre de la mascota' AND ID_RAZA IN (SELECT ID_RAZA FROM RAZA WHERE ID_ESPECIE IN (SELECT ID_ESPECIE FROM ESPECIE WHERE DESCRIPCION = 'Especie'))), 
(SELECT ID_TRATAMIENTO FROM TRATAMIENTO WHERE DESCRIPCION = 'Descripción del tratamiento'), 
(SELECT ID_COD_DIAGNOSTICO FROM COD_DIAGNOSTICO WHERE CODIGO = 'Código de diagnóstico'))

SELECT * FROM duenos


SELECT m.ID_MASCOTAS, m.NOMBRE, m.PESO, m.FECHA_NACIMIENTO, m.SEXO, r.DESCRIPCION AS RAZA FROM MASCOTAS m JOIN RAZA r ON m.ID_RAZA = r.ID_RAZA;

SELECT M.ID_MASCOTAS, M.NOMBRE, M.PESO, M.FECHA_NACIMIENTO, M.SEXO, R.DESCRIPCION AS RAZA, CONCAT(D.NOMBRES, ' ', D.APELLIDOS) AS DUENO FROM MASCOTAS M INNER JOIN RAZA R ON M.ID_RAZA = R.ID_RAZA INNER JOIN DUENOS_MASCOTAS DM ON M.ID_MASCOTAS = DM.ID_MASCOTAS INNER JOIN DUENOS D ON DM.ID_DUENOS = D.ID_DUENOS;

SELECT c.ID_CITAS, m.NOMBRE AS MASCOTA, e.DESCRIPCION AS ESPECIE, cd1.CODIGO AS CODIGO_DIAG_PRINCIPAL, 
cd2.CODIGO AS CODIGO_DIAG_SECUNDARIO, c.FECHA, c.HORA_INICIO, c.HORA_FIN, tc.NOMBRE_CONSULTA, t.DESCRIPCION AS TRATAMIENTO, c.OBSERVACIONES
FROM CITAS c 
INNER JOIN MASCOTAS m ON c.ID_MASCOTAS = m.ID_MASCOTAS
INNER JOIN RAZA r ON m.ID_RAZA = r.ID_RAZA
INNER JOIN ESPECIE e ON r.ID_ESPECIE = e.ID_ESPECIE
INNER JOIN TRATAMIENTO t ON c.ID_TRATAMIENTO = t.ID_TRATAMIENTO
INNER JOIN COD_DIAGNOSTICO cd1 ON c.ID_COD_DIAGNOSTICO_PRINCIPAL = cd1.ID_COD_DIAGNOSTICO
INNER JOIN COD_DIAGNOSTICO cd2 ON c.ID_COD_DIAGNOSTICO_SECUNDARIO = cd2.ID_COD_DIAGNOSTICO
INNER JOIN TIPO_CONSULTA tc ON c.ID_TIPO_CONSULTA = tc.ID_TIPO_CONSULTA;