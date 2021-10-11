const User = require('../database/User');

const userVaildate = require('../validator/user.validator');

const passwordServices = require('../service/password');

module.exports = {
    createAuthLoginMiddleWare: async (req, res, next) => {
        try {
            const userByLogin = await User.findOne({login: req.body.login});

            if (userByLogin) {
                throw new Error('Login is BUSY');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    createAuthEmailMiddleWare: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email});

            if (userByEmail) {
                throw new Error('Email is BUSY');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    idUserMidlleWare: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const userById = await User.findById(user_id);

            if (!userById) {
                throw new Error('id not exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userVaildate.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    createloginUserMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const login = await User
                .findOne({email})
                .lean()
                .select('+password');

            await passwordServices.compare(password, login.password);

            if (!login) {
                throw new Error('wrong email or password');
            }
            next();
        } catch (e) {
            res.json(e.message);
        }
    }

};


