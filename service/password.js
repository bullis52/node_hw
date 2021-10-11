const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const passwordCompare = await bcrypt.compare(password, hashPassword);

        if (!passwordCompare) {
            throw new Error('Wrong email or password');
        }
    }
};
