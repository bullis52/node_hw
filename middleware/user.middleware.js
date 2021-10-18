const User = require('../database/User');
const {userValitators} = require('../validator/index');
const ErrorHandler = require("../errors/ErrorHandler");

module.exports = {
    createAuthLoginMiddleWare: async (req, res, next) => {

        try {
            const userByLogin = await User.findOne({login: req.body.login});

            if (userByLogin) {
                throw new Error('Login is BUSY');
            }

            next();
        } catch (e) {
            next(e);
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
            next(e);
        }

    },

    idUserMidlleWare: async (req, res, next) => {

        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler(`id is not defined`,418);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
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
            next(e);
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
            next(e);
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
            next(e.message);
        }
    },
};


