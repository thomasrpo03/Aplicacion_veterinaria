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


