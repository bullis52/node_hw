const router = require('express').Router();

const {authMiddleware} = require("../middleware/index");
const {authControllers} = require("../controllers/index");

router.post('/login',
    authMiddleware.createUserAuthValidMiddleware,
    authMiddleware.createloginUserMiddleware,
    authControllers.authentication
);

module.exports = router;
