const Joi = require('joi');

const validateUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        age: Joi.number().required(),
        city: Joi.string().required(),
        zipCode: Joi.string().pattern(new RegExp('^[0-9]{5}(?:-[0-9]{4})?$')).required()
    });

    return schema.validate(user);
};

const validateId = (params) => {
    const schema = Joi.object({
        userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    });

    return schema.validate(params);
};

module.exports = { validateUser, validateId };
