const router = require('express').Router();

const userController = require('../controllers/user.controllers');

const authMiddleWare = require('../middleware/auth.middleware');

router.get(`/`,userController.getUsers);

router.post(`/`,authMiddleWare.createAuthLoginMiddleWare,authMiddleWare.createAuthEmailMiddleWare,userController.createUsers);

router.get(`/:user_id`, userController.getUserById);

router.put(`/:user_id`,userController.updateUsers);

module.exports = router;
