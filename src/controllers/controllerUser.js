const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./conexion');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';

const handleError = (res, error) => {
    console.error('Error ejecutando la consulta', error.stack);
    res.status(500).send('Error conectando a la base de datos');
};

//Función para contar todos los usuarios
const countAllUsers = async (req, res) => {
    try {
        const response = await pool.query('SELECT COUNT(*) FROM usuario');
        const count = parseInt(response.rows[0].count, 10);
        res.status(200).json({ count });
    } catch (error) {
        handleError(res, error);
    }
};

// Rutas y controladores de usuarios
const getUsers = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM usuario');
        res.status(200).json(response.rows);
    } catch (error) {
        handleError(res, error);
    }
};

const createUser = async (req, res) => {
    const { nombre, apellido, correo, telefono, nombre_usuario, contraseña } = req.body;
    if (!nombre || !apellido || !correo || !telefono || !nombre_usuario || !contraseña) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        // Hashea la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const response = await pool.query(
            'INSERT INTO usuario (nombre, apellido, correo, telefono, nombre_usuario, contraseña) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [nombre, apellido, correo, telefono, nombre_usuario, hashedPassword]
        );
        res.json({
            message: 'Usuario creado con éxito',
            body: {
                user: { nombre, apellido, correo, telefono, nombre_usuario, contraseña: hashedPassword }
            }
        });
    } catch (error) {
        handleError(res, error);
    }
};

const getUserbyId = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);
        if (response.rows.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.json(response.rows);
    } catch (error) {
        handleError(res, error);
    }
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, correo, telefono, nombre_usuario, contraseña } = req.body;

    if (!nombre || !apellido || !correo || !telefono || !nombre_usuario || !contraseña) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const response = await pool.query(
            'UPDATE usuario SET nombre = $1, apellido = $2, correo = $3, telefono = $4, nombre_usuario = $5, contraseña = $6 WHERE id = $7',
            [nombre, apellido, correo, telefono, nombre_usuario, hashedPassword, id]
        );
        if (response.rowCount === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.json(`Usuario ${id} actualizado con éxito`);
    } catch (error) {
        handleError(res, error);
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('DELETE FROM usuario WHERE id = $1', [id]);
        if (response.rowCount === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.json(`Usuario ${id} eliminado con éxito`);
    } catch (error) {
        handleError(res, error);
    }
};

const patchUser = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    const fields = [];
    const values = [];
    let idx = 1;

    for (const [key, value] of Object.entries(updates)) {
        fields.push(`${key} = $${idx}`);
        values.push(value);
        idx++;
    }

    const query = `UPDATE usuario SET ${fields.join(', ')} WHERE id = $${idx}`;
    values.push(id);

    try {
        const response = await pool.query(query, values);
        if (response.rowCount === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.json(`Usuario ${id} actualizado parcialmente con éxito`);
    } catch (error) {
        handleError(res, error);
    }
};

const optionsHandler = (req, res) => {
    res.setHeader('Allow', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.json({ message: 'Métodos encontrados, revisa el Header' });
};

// Nueva ruta para inicio de sesión
const loginUser = async (req, res) => {
    const { nombre_usuario, contraseña } = req.body;
    if (!nombre_usuario || !contraseña) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        // Buscar el usuario por nombre_usuario
        console.log('Buscando usuario:', nombre_usuario);
        const result = await pool.query('SELECT * FROM usuario WHERE nombre_usuario = $1', [nombre_usuario]);

        if (result.rows.length === 0) {
            console.log('Usuario no encontrado');
            return res.status(404).send('Usuario no encontrado');
        }

        const user = result.rows[0];
        console.log('Usuario encontrado:', user);

        const storedPassword = user.contraseña.toString('utf-8');

        // Comparar la contraseña ingresada con la almacenada
        const match = await bcrypt.compare(contraseña, storedPassword);
        console.log('Comparación de contraseña:', match);

        if (!match) {
            console.log('Credenciales inválidas');
            return res.status(401).send('Credenciales inválidas');
        }

        // Generar un token JWT
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
        console.log('Token generado:', token);

        res.json({ token });
    } catch (error) {
        console.error('Error en loginUser:', error.stack);
        handleError(res, error);
    }
};


module.exports = {
    getUsers,
    createUser,
    getUserbyId,
    updateUser,
    deleteUser,
    patchUser,
    optionsHandler,
    loginUser,
    countAllUsers
};
