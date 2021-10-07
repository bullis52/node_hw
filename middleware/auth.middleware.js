const Auth = require('../database/User');

module.exports = {
    createAuthLoginMiddleWare: async (req,res,next)=>{
        try {
            const userByLogin = await Auth.findOne({login:req.body.login});
            if (userByLogin){
                throw new Error('Login is BUSY');
            }
            next();
        }catch (e) {
            res.json(e.message);
        }
    },
    createAuthEmailMiddleWare: async (req,res,next)=>{
        try {
            const userByEmail = await Auth.findOne({email:req.body.email});
            if (userByEmail){
                throw new Error('Email is BUSY');
            }
            next();
        }catch (e) {
            res.json(e.message);
        }
    }
};
