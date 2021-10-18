const bcrypt = require('bcrypt');
const ErrorHandler = require("../errors/ErrorHandler");

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const passwordCompare = await bcrypt.compare(password, hashPassword);

        if (!passwordCompare) {
            throw new ErrorHandler('Wrong email or password', 218);
        }
    }
};
