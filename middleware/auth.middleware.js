const User = require('../database/User');

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
    createDeleteUserMidlleWare: async (req, res, next) => {
        try {
            const deleteById = await User.findOne({id: req.body.id});
            if (deleteById) {
                throw new Error('already deleted');
            }
            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    createloginUserMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const login = await User.findOne({email, password});

            if (!login) {
                throw new Error('does not exist user');
            }
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};

