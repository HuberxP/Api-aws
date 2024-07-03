const mysql = require('mysql');

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',  // Cambia esto por la dirección de tu servidor MySQL si es diferente
  user: 'root',       // Usuario de MySQL
  password: 'root',  // Contraseña de MySQL
  database: 'practica1'     // Nombre de la base de datos
});

// Conectar a MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL: ' + err.stack);
    return;
  }
  console.log('Conexión establecida con MySQL');
});

// Exportar la conexión para poder utilizarla en otros módulos
module.exports = connection;