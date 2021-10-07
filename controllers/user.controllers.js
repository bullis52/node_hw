const Auth = require('../database/User');

module.exports = {
    getUsers: async (req, res) => {
        try{
            const users = await Auth.find();
            res.json(users);
        }catch (e){
            res.json(e);
        }
    },
    getUserById: async (req, res) => {
        const { user_id } = req.params;
        try{
            const users = await Auth.findById(user_id);
            res.json(users);
        }catch (e){
            res.json(e);
        }
    },
    createUsers:async (req, res) => {
        try{
            const users = await Auth.create(req.body);
            res.json(users);
        }catch (e){
            res.json(e);
        }

    },
    updateUsers: (req, res) => {
        res.json('asas');
    }
};
