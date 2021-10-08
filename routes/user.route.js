const router = require('express').Router();

const {getUsers, deleteUsers, createUsers, getUserById, updateUsers,} = require('../controllers/user.controllers');

const {
    createAuthLoginMiddleWare,
    createDeleteUserMidlleWare,
    createAuthEmailMiddleWare
} = require('../middleware/auth.middleware');

const {authentication} = require('../controllers/auth.controllers');

router.get('/', getUsers);

router.post('/', createAuthLoginMiddleWare, createAuthEmailMiddleWare, createUsers);

router.post('/login', authentication);

router.get('/:user_id', getUserById);

router.put('/:user_id', createAuthLoginMiddleWare, updateUsers);

router.delete('/:user_id', createDeleteUserMidlleWare, deleteUsers);

module.exports = router;
