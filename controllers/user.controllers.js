const User = require('../database/User');

const passwordHashing = require('../service/password');

const utilUser = require('../util/util.user');

module.exports = {
    getUsers: async (req, res) => {

        try {
            const users = await User.find().lean();

            const userNormalizate = users.map(value => utilUser.userNormalizator(value));

            res.json(userNormalizate);

        } catch (e) {
            res.json(e);
        }
    },

    getUserById: async (req, res) => {

        try {
            const {user_id} = req.params;
            const users = await User.findById(user_id).lean();

            const userNormalizate = utilUser.userNormalizator(users);

            res.json(userNormalizate);
        } catch (e) {
            res.json(e);
        }
    },

    createUsers: async (req, res) => {

        try {
            const PasswordHash = await passwordHashing.hash(req.body.password);
            const users = await User.create({...req.body, password: PasswordHash});
            res.json(users);
        } catch (e) {
            res.json(e.message);
        }

    },

    deleteUsers: async (req, res) => {

        try {
            const {user_id} = req.params;
            const users = await User.findOneAndDelete(user_id);
            res.json(users);
        } catch (e) {
            res.json(e);
        }
    },

    updateUsers: async (req, res) => {

        try {
            const {user_id} = req.params;
            const users = await User.findByIdAndUpdate(user_id, req.body);

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }
    }
};
