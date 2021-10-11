const Joi = require('joi');

const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../config/regex');
const userRoles = require('../config/user.roles');

const createUserValidator = Joi.object({
    login: Joi
        .string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required(),
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .required()
        .lowercase()
        .trim(),
    role: Joi
        .string()
        .allow(...Object.values(userRoles)),
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required()
});

// const updateUserValidator = Joi.object({
//     name: Joi
//         .string()
//         .required()
//         .alphanum()
//         .min(3)
//         .max(20)
//         .trim()
// });
//
// const isUserIdValid = Joi.object({
//     _id: Joi
//         .string()
//         .required()
//         .trim()
//         .length(24)
// });

module.exports = {createUserValidator};

