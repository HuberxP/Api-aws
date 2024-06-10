const { Router } = require('express');
const router = Router();

const { getUsers, createUsers, getUserbyId, deleteUser, updateUser, patchUser, optionsHandler} = require('../controllers/controller')

router.get('/usuario', getUsers );
router.get('/usuario/:id', getUserbyId);
router.post('/usuario', createUsers);
router.delete('/usuario/:id', deleteUser);
router.put('/usuario/:id', updateUser );
router.patch('/usuario/:id', patchUser);
router.options('/usuario', optionsHandler);




module.exports = router;

