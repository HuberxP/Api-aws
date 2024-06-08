*Primero instalar node.js*
*Segundo instalar Postman o Insomnia*
*Tercero descargar postgres*

**Ya instaladas todas**

1. despues de instalar postgres, buscar una aplicacion que se llama pgAdmin para crear la base de datos y las tablas

CREATE DATABASE api-1;

2. Crear una tabla a esa base de datos, por ejemplo usuario:

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    correo TEXT,
    telefono VARCHAR(20)
);

3. Ingresar datos a la db:

INSERT INTO usuario (nombre, apellido, correo, telefono) VALUES ('Juan', 'Perez', 'juan.perez@example.com', '123-456-7890');
INSERT INTO usuario (nombre, apellido, correo, telefono) VALUES ('Ana', 'Gomez', 'ana.gomez@example.com', '098-765-4321');
INSERT INTO usuario (nombre, apellido, correo, telefono) VALUES ('Carlos', 'Sanchez', 'carlos.sanchez@example.com', '555-555-5555');


*Comandos Para Visual studio*
npm  init -y = Para inicializar el proyecto
npm -i express pg = descargar complementos necesarios

*Nodemon*
npm i nodemon -D

Se edita el archivo Package.json en el apartado de scripts
"dev": "nodemon ruta del index, ejemplo src/js/index.js

se ejecuta el comando = npm run dev

(node src/js/index.js)


psql -U postgres

sudo -u postgres psql





#Comado para insertar y actulizar datos en json

{
"nombre": "Huber",
"apellido": "Hernandez",
"correo": "hernandezhuber48@gmail.com",
"telefono": "3214567890"
}
-----------------------------------------------------------------------------------------------------------------



   




   ,     #_
   ~\_  ####_       
  ~~  \_#####\
  ~~     \###|
  ~~       \#/ ___   
   ~~       V~' '->
    ~~~         /
      ~~._.   _/
         _/ _/
       _/m/'



 #!/bin/bash
yum update -y
yum install -y nginx
systemctl start nginx
systemctl enable nginx



-- Crear una tabla llamada 'usuario'
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    correo TEXT,
    telefono VARCHAR(20)
);


pm2 start main.js

node index.js