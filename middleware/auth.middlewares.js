const User = require("../database/User");
const passwordServices = require("../service/password");
const {authValidators: {authValidator}} = require("../validator/index");

module.exports = {
    createloginUserMiddleware: async (req, res, next) => {

        try {
            const {email, password} = req.body;
            const login = await User
                .findOne({email})
                .select('+password')
                .lean();

            await passwordServices.compare(password, login.password);

            if (!login) {
                throw new Error('wrong email or password');
            }

            next();
        } catch (e) {
            next(e);
        }

    },
    createUserAuthValidMiddleware: (req, res, next) => {

        try {
            const user = req.body;

            const {error, value} = authValidator.validate(user);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
};
