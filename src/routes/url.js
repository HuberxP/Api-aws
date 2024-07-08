const { Router } = require('express');
const router = Router();

const { 
    getUsers, 
    createUser, 
    getUserbyId, 
    deleteUser, 
    updateUser, 
    patchUser, 
    optionsHandler, 
    loginUser,
    countAllUsers 
} = require('../controllers/controllerUser');
const { 
    getProducts, 
    createProducts, 
    getProductbyId, 
    deleteProduct, 
    updateProduct, 
    patchProduct,
    countAllProducts,
    countProductsByStatus 
} = require('../controllers/controllerProducts');
const { 
    getClients, 
    createClient, 
    getClientId, 
    deleteClient, 
    updateClient, 
    patchClient,
    countAllClients 
} = require('../controllers/controllerClients');

// Rutas para usuarios
router.get('/usuario', getUsers);
router.get('/usuario/:id', getUserbyId);
router.post('/usuario/registro', createUser); // Cambiado para evitar conflicto con login
router.post('/usuario/login', loginUser); // Rutas distintas para registro y login
router.delete('/usuario/:id', deleteUser);
router.put('/usuario/:id', updateUser);
router.patch('/usuario/:id', patchUser);
router.options('/usuario', optionsHandler);
router.get('/usuario/count', countAllUsers); // Ruta para contar todos los usuarios

// Rutas para productos
router.get('/productos', getProducts);
router.post('/productos', createProducts);
router.get('/productos/:id', getProductbyId);
router.delete('/productos/:id', deleteProduct);
router.put('/productos/:id', updateProduct);
router.patch('/productos/:id', patchProduct);
router.options('/productos', optionsHandler);
router.get('/productos/count', countAllProducts);
router.get('/productos/count/estado', countProductsByStatus);

// Rutas para clientes
router.get('/clientes', getClients);
router.post('/clientes', createClient);
router.get('/clientes/:id', getClientId);
router.delete('/clientes/:id', deleteClient);
router.put('/clientes/:id', updateClient);
router.patch('/clientes/:id', patchClient);
router.options('/clientes', optionsHandler);
router.get('/clientes/count', countAllClients);


module.exports = router;
