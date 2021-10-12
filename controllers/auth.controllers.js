const userUtil = require('../util/util.user');

module.exports = {
    authentication: (req, res) => {

        try {
            const user = userUtil.userNormalizator(req.body);

            res.json(`${user.email} - logget in`);
        } catch (e) {
            res.json(e.message);
        }
    }
};
