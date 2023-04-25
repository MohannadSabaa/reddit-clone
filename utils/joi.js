const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(8).required(),
    password: Joi.string().min(6).required()
}, {abortEarly: false})


module.exports = schema;