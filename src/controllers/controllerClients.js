const pool = require('./conexion');


const handleError = (res, error) => {
    console.error('Error ejecutando la consulta', error.stack); 
    res.status(500).send('Error conectando a la base de datos');
};

const getClients = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM clientes');
        res.status(200).json(response.rows);
    } catch (error) {
        handleError(res, error);
    }
};

const createClient = async (req, res) => {
    const {nombre, nombre2, apellido, apellido2, direccion, correo, telefono} = req.body;
    if (!nombre || !apellido || !apellido2 || !direccion || !correo || !telefono) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        const response = await pool.query(
            'INSERT INTO clientes (nombre, nombre2, apellido, apellido2,  direccion, correo, telefono) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [nombre, nombre2, apellido, apellido2, direccion, correo, telefono]
        );
        res.json({
            message: 'cliente creado con éxito',
            body: {
                user: {nombre, nombre2, apellido, apellido2, direccion,correo, telefono }
            }
        });
    } catch (error) {
        handleError(res, error);
    }
};

const getClientId = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
        if (response.rows.length === 0) {
            return res.status(404).send('Cliente no encontrado');
        }
        res.json(response.rows);
    } catch (error) {
        handleError(res, error);
    }
};

const updateClient = async (req, res) => {
    const id = req.params.id;
    const {  nombre, nombre2, apellido, apellido2, direccion, correo, telefono } = req.body;

    if (!nombre || !apellido || !apellido2 || !direccion || !correo || !telefono) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        const response = await pool.query(
            'UPDATE clientes SET nombre = $1, nombre2 = $2, apellido = $3, apellido2 = $4, direccion = $5, correo = $6, telefono = $7 WHERE id = $8',
            [nombre, nombre2, apellido, apellido2, direccion, correo, telefono, id]
        );
        if (response.rowCount === 0) {
            return res.status(404).send('Cliente no encontrado');
        }
        res.json(`Cliente ${id} actualizado con éxito`);
    } catch (error) {
        handleError(res, error);
    }
};

const deleteClient = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
        if (response.rowCount === 0) {
            return res.status(404).send('Cliente no encontrado');
        }
        res.json(`Cliente ${id} eliminado con éxito`);
    } catch (error) {
        handleError(res, error);
    }
};

const patchClient = async (req, res) => {
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

    const query = `UPDATE clientes SET ${fields.join(', ')} WHERE id = $${idx}`;
    values.push(id);

    try {
        const response = await pool.query(query, values);
        if (response.rowCount === 0) {
            return res.status(404).send('Clientes no encontrado');
        }
        res.json(`Cliente ${id} actualizado parcialmente con éxito`);
    } catch (error) {
        handleError(res, error);
    }

};





module.exports = {
    getClients,
    createClient,
    getClientId,
    deleteClient,
    patchClient, 
    updateClient
   
};
