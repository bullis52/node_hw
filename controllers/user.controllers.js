const User = require('../database/User');
const passwordHashing = require('../service/password');
const utilUser = require('../util/util.user');

module.exports = {
    getUsers: async (req, res, next) => {

        try {
            const users = await User.find().lean();

            const userNormalizate = users.map(value => utilUser.userNormalizator(value));

            res.json(userNormalizate);

        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res, next) => {

        try {
            const {user_id} = req.params;
            const users = await User.findById(user_id).lean();

            const userNormalizate = await utilUser.userNormalizator(users);

            res.json(userNormalizate);
        } catch (e) {
            next(e);
        }
    },
    createUsers: async (req, res, next) => {

        try {
            const PasswordHash = await passwordHashing.hash(req.body.password);
            const users = await User.create({...req.body, password: PasswordHash});

            res.json(`${users.email} - registred!!!!!!!!!!!!`);
        } catch (e) {
            next(e);
        }

    },
    deleteUsers: async (req, res, next) => {

        try {
            const {user_id} = req.params;
            const users = await User.findOneAndDelete(user_id);
            res.json(`${users.email} - deleted`);
        } catch (e) {
            next(e);
        }
    },
    updateUsers: async (req, res, next) => {

        try {
            const {user_id} = req.params;
            await User.findByIdAndUpdate(user_id, req.body);

            res.json(`${user_id} - updated!!!!!`);
        } catch (e) {
            next(e);
        }
    }
};
