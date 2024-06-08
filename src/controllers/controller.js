const { Pool } = require('pg');

const pool = new Pool({
    host: 'aws-practica.cnn8hwvzdpqx.us-east-1.rds.amazonaws.com',
    user: 'postgres',
    password: 'Huber1216',
    database: 'awsdbpractica2',
    port: '5432',
    ssl: {
        rejectUnauthorized: false
    }
});

const getUsers = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM usuario');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error ejecutando la consulta', error.stack);
        res.status(500).send('Error conectando a la base de datos');
    }
}

const createUsers = async (req, res) => {
    const { nombre, apellido, correo, telefono } = req.body;
    try {
        const response = await pool.query('INSERT INTO usuario (nombre, apellido, correo, telefono) VALUES ($1, $2, $3, $4)', [nombre, apellido, correo, telefono]);
        console.log(response);
        res.json({
            message: 'Usuario creado con exito',
            body: {
                user: { nombre, apellido, correo, telefono }
            }
        });
    } catch (error) {
        console.error('Error ejecutando la consulta', error.stack);
        res.status(500).send('Error conectando a la base de datos');
    }
};

const getUserbyId = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);
        res.json(response.rows);
    } catch (error) {
        console.error('Error ejecutando la consulta', error.stack);
        res.status(500).send('Error conectando a la base de datos');
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, correo, telefono } = req.body;
    try {
        const response = await pool.query('UPDATE usuario SET nombre = $1, apellido = $2, correo = $3, telefono = $4 WHERE id = $5', 
        [nombre, apellido, correo, telefono, id]);
        console.log(response);
        res.json(`Usuario ${id} actualizado con exito`)
    } catch (error) {
        console.error('Error ejecutando la consulta', error.stack);
        res.status(500).send('Error conectando a la base de datos');
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('DELETE FROM usuario WHERE id = $1', [id]);
        console.log(response);
        res.json(`Usuario ${id} eliminado con exito`);
    } catch (error) {
        console.error('Error ejecutando la consulta', error.stack);
        res.status(500).send('Error conectando a la base de datos');
    }
}

module.exports = {
    getUsers,
    createUsers,
    getUserbyId,
    deleteUser,
    updateUser
}
