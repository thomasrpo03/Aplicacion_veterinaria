ALTER USER 'root'@'localhost' IDENTIFIED BY 'nueva_contraseña';

RENAME USER 'root'@'localhost' TO 'nuevo_usuario'@'localhost';

ALTER USER 'nuevo_usuario'@'localhost' IDENTIFIED WITH mysql_native_password BY 'contraseña';

ALTER TABLE DUEÑOS RENAME TO duenos;
ALTER TABLE duenos CHANGE COLUMN ID_DUEÑOS ID_DUENOS INT;

ALTER TABLE DUEÑOS_MASCOTAS RENAME TO DUENOS_MASCOTAS;
ALTER TABLE DUENOS_MASCOTAS CHANGE COLUMN ID_DUEÑOS ID_DUENOS INT;

ALTER TABLE DUENOS 
  CHANGE COLUMN ID_DUEÑOS ID_DUENOS INT,
  ALGORITHM=INPLACE;
  
  ALTER TABLE DUENOS 
  CHANGE COLUMN ID_DUEÑOS ID_DUENOS INT,
  ALGORITHM=COPY;
  
  SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE DUENOS
  CHANGE COLUMN ID_DUEÑOS ID_DUENOS INT,
  ALGORITHM=INPLACE;

SET FOREIGN_KEY_CHECKS=1;