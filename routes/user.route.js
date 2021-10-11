const router = require('express').Router();

const {getUsers, deleteUsers, createUsers, getUserById, updateUsers,} = require('../controllers/user.controllers');

const {
    createAuthLoginMiddleWare,
    idUserMidlleWare,
    createAuthEmailMiddleWare,
    isUserBodyValid,
    createloginUserMiddleware
} = require('../middleware/auth.middleware');

const {authentication} = require('../controllers/auth.controllers');

router.get('/', getUsers);
router.post('/', isUserBodyValid, createAuthLoginMiddleWare, createAuthEmailMiddleWare, createUsers);


router.post('/login', createloginUserMiddleware, authentication);

router.get('/:user_id', idUserMidlleWare, getUserById);
router.put('/:user_id', createAuthLoginMiddleWare, idUserMidlleWare, updateUsers);
router.delete('/:user_id', idUserMidlleWare, deleteUsers);

module.exports = router;
