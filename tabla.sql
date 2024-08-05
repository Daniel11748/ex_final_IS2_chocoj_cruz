create database registro_usuarios;


create table usuarios ( 
	USER_ID SERIAL,
	USER_NOMBRE VARCHAR (50) NOT NULL,
	USER_TELEFONO VARCHAR (15) NOT NULL,
	USER_CORREO VARCHAR (25) NOT NULL,
	USER_SITUACION	SMALLINT DEFAULT 1,
	PRIMARY KEY(USER_ID)
);