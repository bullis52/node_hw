const User = require('../database/User');

module.exports = {
    authentication: async (req, res) => {
        try {
            const login = await User.findOne({email: req.body.email, password: req.body.password});

            if (!login) {
                throw new Error('failed email or password');
            }
            res.json('success');
        } catch (e) {
            res.json(e.message);
        }
    }
};
