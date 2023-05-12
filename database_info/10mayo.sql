DELIMITER $$
CREATE PROCEDURE SP_AGREGAR_DUENOS(
    IN tipo_identificacion_desc VARCHAR(100),
    IN numero_identificacion VARCHAR(100),
    IN nombres VARCHAR(100),
    IN apellidos VARCHAR(100),
    IN direccion VARCHAR(200),
    IN barrio VARCHAR(100),
    IN email VARCHAR(150),
    IN telefono VARCHAR(100)
)
BEGIN
    DECLARE tipo_identificacion_id INT;
    
    -- Buscar el ID del tipo de identificación
    SELECT ID_TIPO_IDENTIFICACION INTO tipo_identificacion_id 
    FROM TIPO_IDENTIFICACION 
    WHERE DESCRIPCION = tipo_identificacion_desc;
    
    -- Insertar el dueño con el tipo de identificación
    INSERT INTO DUENOS(
        NUMERO_IDENTIFICACION, 
        NOMBRES, 
        APELLIDOS, 
        DIRECCION, 
        BARRIO, 
        EMAIL, 
        TELEFONO, 
        ID_TIPO_IDENTIFICACION
    )
    VALUES(
        numero_identificacion, 
        nombres, 
        apellidos, 
        direccion, 
        barrio, 
        email, 
        telefono, 
        tipo_identificacion_id
    );
END$$
DELIMITER ;

CALL SP_AGREGAR_DUENOS('CEDULA DE EXTRANJERIA', '123456789', 'Juan', 'Pérez', 'Calle 123', 'Barrio 1', 'juan.perez@gmail.com', '555-1234');


SELECT ID_RAZA, DESCRIPCION FROM raza;


DELIMITER //
CREATE PROCEDURE `SP_ACTUALIZAR_DUENOS` (
IN `NUMERO_IDENTIFICACION` VARCHAR(100),
IN `NOMBRES` VARCHAR(100),
IN `APELLIDOS` VARCHAR(100),
IN `BARRIO` VARCHAR(100),
IN `DIRECCION` VARCHAR(200),
IN `EMAIL` VARCHAR(150),
IN `TELEFONO` VARCHAR(100),
IN `ID_TIPO_IDENTIFICACION` INT,
IN `ID_DUENO` INT
)
COMMENT 'Procedimiento almacenado para actualizar dueños.'
BEGIN
UPDATE duenos 
SET NUMERO_IDENTIFICACION = NUMERO_IDENTIFICACION,NOMBRES= NOMBRES ,APELLIDOS = APELLIDOS ,BARRIO=BARRIO,DIRECCION=DIRECCION,EMAIL=EMAIL,TELEFONO=TELEFONO,ID_TIPO_IDENTIFICACION=ID_TIPO_IDENTIFICACION 
WHERE ID_DUENOS = ID_DUENO;
END//
DELIMITER ;

CALL SP_ACTUALIZAR_DUENOS('111111111','KevinPrueba','RestrepoPrueba','BARRIOPRUEBA','Cr prueba # prueba','kevinresca@prueba.com','318prueba123',1,5);


UPDATE duenos SET NUMERO_IDENTIFICACION = 3333, NOMBRES = 'PRUEBAUPDATEBD', APELLIDOS = 'PRUEBAUPDATEBD', BARRIO = 'BARRIOPRUEBA', DIRECCION = 'BARRIOPRUEBA', EMAIL = 'BARRIOPRUEBA@MAIL', TELEFONO = '499494BARRIOPRUEBA', ID_TIPO_IDENTIFICACION = 3 WHERE ID_DUENOS = 5

SELECT M.ID_MASCOTAS, M.NOMBRE, M.PESO, M.FECHA_NACIMIENTO, M.SEXO, R.DESCRIPCION AS RAZA, CONCAT(D.NOMBRES, ' ', D.APELLIDOS) AS DUENO FROM MASCOTAS M INNER JOIN RAZA R ON M.ID_RAZA = R.ID_RAZA INNER JOIN DUENOS_MASCOTAS DM ON M.ID_MASCOTAS = DM.ID_MASCOTAS INNER JOIN DUENOS D ON DM.ID_DUENOS = D.ID_DUENOS;

SELECT * FROM mascotas;

SELECT * FROM duenos;

SELECT ID_DUENOS, NUMERO_IDENTIFICACION, NOMBRES, APELLIDOS, BARRIO, DIRECCION, EMAIL, TELEFONO FROM duenos ORDER BY Id_duenos ASC;

INSERT INTO DUENOS(ID_TIPO_IDENTIFICACION, NUMERO_IDENTIFICACION, NOMBRES, APELLIDOS, DIRECCION, BARRIO, EMAIL, TELEFONO, )
    VALUES(
        3,
		  '3211213', 
        'FNOMBRESFFF', 
        'FAPELLIDOSFFF', 
        'FDIRECCIONFFF', 
        'FBARRIOFFF', 
        'FEMAILFFFF', 
        'FTELEFONOFFFF'
    );
    
    UPDATE DUENOS SET 
	 NOMBRES = '', 
	 APELLIDOS = IFNULL(?, APELLIDOS), 
	 BARRIO = IFNULL(?, BARRIO), 
	 DIRECCION = IFNULL(?, DIRECCION), 
	 EMAIL = IFNULL(?, EMAIL), 
	 TELEFONO = IFNULL(?, TELEFONO), 
	 ID_TIPO_IDENTIFICACION = IFNULL(?, ID_TIPO_IDENTIFICACION)
	 WHERE ID_DUENOS = 71
	 
	 
	 
	 INSERT INTO DUENOS (ID_TIPO_IDENTIFICACION, NUMERO_IDENTIFICACION, NOMBRES, APELLIDOS, DIRECCION, BARRIO, EMAIL, TELEFONO) VALUES (3, '3211213', 'FNOMBRESFFF', 'FAPELLIDOSFFF', 'FDIRECCIONFFF', 'FBARRIOFFF', 'FEMAILFFFF', 'FTELEFONOFFFF');


SELECT ID_TIPO_IDENTIFICACION, DESCRIPCION FROM tipo_identificacion;