DELIMITER //
CREATE PROCEDURE `SP_CITAS_AGENDADAS_COMPLETO` (
)
COMMENT 'Procedimiento almacenado para la consulta de todas las citas.'
BEGIN
SELECT M.NOMBRE AS 'mascota', E.DESCRIPCION AS 'especie', CD.CODIGO AS 'codigoPrincipal', CD2.CODIGO AS 'codigoSecundario', 
LEFT(C.FECHA,10) AS 'fecha', C.HORA_INICIO AS horaInicio, C.HORA_FIN AS horaFin, TC.NOMBRE_CONSULTA AS 'tipoConsulta', T.DESCRIPCION AS 'tratamiento', C.OBSERVACIONES AS observaciones
FROM mascotas M
INNER JOIN raza R ON R.ID_RAZA = M.ID_RAZA
INNER JOIN especie E ON E.ID_ESPECIE = R.ID_ESPECIE
INNER JOIN citas	C ON C.ID_MASCOTAS = M.ID_MASCOTAS
INNER JOIN cod_diagnostico CD ON CD.ID_COD_DIAGNOSTICO = C.ID_COD_DIAGNOSTICO_PRINCIPAL
INNER JOIN cod_diagnostico CD2 ON CD2.ID_COD_DIAGNOSTICO = C.ID_COD_DIAGNOSTICO_SECUNDARIO
INNER JOIN tipo_consulta TC ON TC.ID_TIPO_CONSULTA = C.ID_TIPO_CONSULTA
INNER JOIN tratamiento T ON T.ID_TRATAMIENTO = C.ID_TRATAMIENTO;
END//
DELIMITER ;


CALL SP_CITAS_AGENDADAS_COMPLETO();

DELIMITER //
CREATE PROCEDURE SP_AGREGAR_CITAS(
    IN nombre_mascota VARCHAR(100),
    IN id_cod_diagnostico_principal INT,
    IN id_cod_diagnostico_secundario INT,
    IN fecha DATE,
    IN hora_inicio TIME,
    IN hora_fin TIME,
    IN id_tipo_consulta INT,
    IN id_tratamiento INT,
    IN observaciones VARCHAR(500)
)
BEGIN
    DECLARE id_mascota INT;
    
    -- Obtener el id de la mascota con el nombre especificado
    SELECT ID_MASCOTAS INTO id_mascota
    FROM MASCOTAS
    WHERE NOMBRE = nombre_mascota;
    
    -- Insertar la nueva cita en la tabla CITAS
    INSERT INTO CITAS (
        FECHA,
        HORA_INICIO,
        HORA_FIN,
        OBSERVACIONES,
        ID_TIPO_CONSULTA,
        ID_MASCOTAS,
        ID_TRATAMIENTO,
        ID_COD_DIAGNOSTICO_PRINCIPAL,
        ID_COD_DIAGNOSTICO_SECUNDARIO
    ) VALUES (
        fecha,
        hora_inicio,
        hora_fin,
        observaciones,
        id_tipo_consulta,
        id_mascota,
        id_tratamiento,
        id_cod_diagnostico_principal,
        id_cod_diagnostico_secundario
    );
    
    -- Confirmar la inserción
    SELECT 'La cita ha sido agregada correctamente.' AS mensaje;
    
END//
DELIMITER ;

CALL SP_AGREGAR_CITAS('LUCY', 1, 2, '2023-05-10', '10:00:00', '11:00:00', 1, 1, 'Observaciones de la cita');

##################TABLA CLIENTES#######################


DELIMITER //
CREATE PROCEDURE `SP_AGREGAR_DUENOS` (
IN `ID_TIPO_IDENTIFICACION` INT,
IN `NUMERO_IDENTIFICACION` VARCHAR(100),
IN `NOMBRES` VARCHAR(100),
IN `APELLIDOS` VARCHAR(100),
IN `DIRECCION` VARCHAR(200),
IN `BARRIO` VARCHAR(100),
IN `EMAIL` VARCHAR(150),
IN `TELEFONO` VARCHAR(100)
)
COMMENT 'Procedimiento almacenado para agregar dueños.'
BEGIN
INSERT INTO DUENOS(ID_TIPO_IDENTIFICACION,NUMERO_IDENTIFICACION,NOMBRES,APELLIDOS,DIRECCION,BARRIO,EMAIL,TELEFONO) 
VALUES (ID_TIPO_IDENTIFICACION,NUMERO_IDENTIFICACION,NOMBRES,APELLIDOS,DIRECCION,BARRIO,EMAIL,TELEFONO);
END//
DELIMITER ;


CALL SP_AGREGAR_DUENOS(1,'111111111','KevinPrueba','THOMASSSSS','Cr prueba # prueba','prueba#1','kevinresca@prueba.com','318prueba123');



DELIMITER //
CREATE PROCEDURE `SP_AGREGAR_MASCOTAS` (
IN `NOMBRE` VARCHAR(100),
IN `PESO` VARCHAR(100),
IN `FECHA_NACIMIENTO` DATE,
IN `SEXO` VARCHAR(50),
IN `ID_RAZA` INT
)
COMMENT 'Procedimiento almacenado para agregar mascotas.'
BEGIN
INSERT INTO MASCOTAS (NOMBRE,PESO,FECHA_NACIMIENTO,SEXO,ID_RAZA ) 
VALUES (NOMBRE,PESO,FECHA_NACIMIENTO,SEXO,ID_RAZA);
END//
DELIMITER ;


CALL SP_AGREGAR_MASCOTAS('PruebaMascota','5 KG','2018-01-01','MACHO',26);


