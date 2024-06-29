const pool = require('./conexion');


const handleError = (res, error) => {
    console.error('Error ejecutando la consulta', error.stack);
    res.status(500).send('Error conectando a la base de datos');
};

const getProducts = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM productos');
        res.status(200).json(response.rows);
    } catch (error) {
        handleError(res, error);
    }
};

const createProducts = async (req, res) => {
    const {nombre, precio, estado, imagen_url} = req.body;
    if (!nombre || !precio || !estado || !imagen_url) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        const response = await pool.query(
            'INSERT INTO productos (nombre, precio, estado, imagen_url) VALUES ($1, $2, $3, $4)',
            [nombre, precio, estado, imagen_url]
        );
        res.json({
            message: 'Producto creado con éxito',
            body: {
                user: {nombre, precio, estado, imagen_url }
            }
        });
    } catch (error) {
        handleError(res, error);
    }
};

const getProductbyId = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
        if (response.rows.length === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.json(response.rows);
    } catch (error) {
        handleError(res, error);
    }
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const {  nombre, precio, estado, imagen_url } = req.body;

    if (!nombre || !precio || !estado || !imagen_url) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        const response = await pool.query(
            'UPDATE productos SET nombre = $1, precio = $2, estado = $3, imagen_url = $4 WHERE id = $5',
            [nombre, precio, estado, imagen_url, id]
        );
        if (response.rowCount === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.json(`producto ${id} actualizado con éxito`);
    } catch (error) {
        handleError(res, error);
    }
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('DELETE FROM productos WHERE id = $1', [id]);
        if (response.rowCount === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.json(`Producto ${id} eliminado con éxito`);
    } catch (error) {
        handleError(res, error);
    }
};

const patchProduct = async (req, res) => {
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

    const query = `UPDATE productos SET ${fields.join(', ')} WHERE id = $${idx}`;
    values.push(id);

    try {
        const response = await pool.query(query, values);
        if (response.rowCount === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.json(`Producto ${id} actualizado parcialmente con éxito`);
    } catch (error) {
        handleError(res, error);
    }

};





module.exports = {
    getProducts,
    createProducts,
    getProductbyId,
    deleteProduct,
    patchProduct, 
    updateProduct
   
};
