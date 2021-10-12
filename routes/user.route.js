const router = require('express').Router();

const {userControllers} = require('../controllers/index');

const {userMiddleware} = require('../middleware/index');

router.get('/', userControllers.getUsers);
router.post('/',
    userMiddleware.isUserBodyValid,
    userMiddleware.createAuthLoginMiddleWare,
    userMiddleware.createAuthEmailMiddleWare,
    userControllers.createUsers
);

router.get('/:user_id',
    userMiddleware.isIdUserValid,
    userMiddleware.idUserMidlleWare,
    userControllers.getUserById
);
router.put('/:user_id',
    userMiddleware.isUserUpdateValid,
    userMiddleware.createAuthLoginMiddleWare,
    userMiddleware.idUserMidlleWare,
    userControllers.updateUsers
);
router.delete('/:user_id',
    userMiddleware.idUserMidlleWare,
    userControllers.deleteUsers
);

module.exports = router;
