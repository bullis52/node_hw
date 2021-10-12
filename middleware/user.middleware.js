const User = require('../database/User');
const {userValitators} = require('../validator/index');

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
            const {error, value} = userValitators.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            res.json(e.message);
        }

    },
    isUserUpdateValid: (req, res, next) => {

        try {
            const user = req.body;

            const {error, value} = userValitators.createUpdateUserValidator.validate(user);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    isIdUserValid: (req, res, next) => {

        try {
            const {user_id} = req.params;

            const {error, value} = userValitators.createIsUserIdValid.validate({_id: user_id});

            if (error) {
                throw new Error('Wrong id validation!' + error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};


