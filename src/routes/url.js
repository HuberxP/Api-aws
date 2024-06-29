const { Router } = require('express');
const router = Router();

const { getUsers, createUsers, getUserbyId, deleteUser, updateUser, patchUser, optionsHandler} = require('../controllers/controllerUser')
const { getProducts, createProducts, getProductbyId, deleteProduct, updateProduct, patchProduct} = require('../controllers/controllerProducts')
const { getClients, createClient, getClientId, deleteClient, updateClient, patchClient} = require('../controllers/controllerClients')

router.get('/usuario', getUsers );
router.get('/usuario/:id', getUserbyId);
router.post('/usuario', createUsers);
router.delete('/usuario/:id', deleteUser);
router.put('/usuario/:id', updateUser );
router.patch('/usuario/:id', patchUser);
router.options('/usuario', optionsHandler);

router.get('/productos', getProducts);
router.post('/productos', createProducts)
router.get('/productos/:id', getProductbyId)
router.delete('/productos/:id', deleteProduct)
router.put('/productos/:id', updateProduct)
router.patch('/productos/:id', patchProduct)
router.options('/productos', optionsHandler)

router.get('/clientes', getClients);
router.post('/clientes', createClient)
router.get('/clientes/:id', getClientId)
router.delete('/clientes/:id', deleteClient)
router.put('/clientes/:id', updateClient)
router.patch('/clientes/:id', patchClient)
router.options('/clientes', optionsHandler)

module.exports = router;

