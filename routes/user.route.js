const router = require('express').Router();

const userController = require('../controllesr/user.controllers');

router.get(`/`,userController.getUsers);

router.get(`/:user_id`, userController.getUserById);

router.post(`/`,userController.createUsers);

router.put(`/:user_id`,userController.updateUsers);

module.exports = router;