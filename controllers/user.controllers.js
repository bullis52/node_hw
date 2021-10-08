const User = require('../database/User');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            res.json(e);
        }
    },
    getUserById: async (req, res) => {
        try {
            const {user_id} = req.params;
            const users = await User.findById(user_id);
            res.json(users);
        } catch (e) {
            res.json(e);
        }
    },
    createUsers: async (req, res) => {
        try {
            const users = await User.create(req.body);
            res.json(users);
        } catch (e) {
            res.json(e);
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
    updateUsers: (req, res) => {
        res.json('asas');
    }

};
