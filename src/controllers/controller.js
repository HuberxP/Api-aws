const pool = require('./conexion');


const handleError = (res, error) => {
    console.error('Error ejecutando la consulta', error.stack);
    res.status(500).send('Error conectando a la base de datos');
};

const getUsers = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM usuario');
        res.status(200).json(response.rows);
    } catch (error) {
        handleError(res, error);
    }
};

const createUsers = async (req, res) => {
    const { nombre, apellido, correo, telefono } = req.body;
    if (!nombre || !apellido || !correo || !telefono) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        const response = await pool.query(
            'INSERT INTO usuario (nombre, apellido, correo, telefono) VALUES ($1, $2, $3, $4)',
            [nombre, apellido, correo, telefono]
        );
        res.json({
            message: 'Usuario creado con éxito',
            body: {
                user: { nombre, apellido, correo, telefono }
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
    const { nombre, apellido, correo, telefono } = req.body;

    if (!nombre || !apellido || !correo || !telefono) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        const response = await pool.query(
            'UPDATE usuario SET nombre = $1, apellido = $2, correo = $3, telefono = $4 WHERE id = $5',
            [nombre, apellido, correo, telefono, id]
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
    //res.sendStatus(204);
    res.json({message: 'Métodos encontrados, revisa el Header'});
};



module.exports = {
    getUsers,
    createUsers,
    getUserbyId,
    updateUser,
    deleteUser,
    patchUser,
    optionsHandler
};
