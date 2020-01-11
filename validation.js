// Validation
const Joi = require('@hapi/joi');

// Register Validation
const registerValidation = data =>{
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().min(10).max(15).required(),
        image: Joi.string().min(8).required()
    };  

    return Joi.validate(data, schema);
};

// Login Validation
const loginValidation = data =>{
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };  

    return Joi.validate(data, schema);
};

// Referral Validation
const referralValidation = data => {
    const schema = {
        user_id: Joi.string().min(6).required(),
        name: Joi.string().min(5).required(),
        email: Joi.string().min(6).required().email(),
        phone: Joi.string().min(6).required(),
        course: Joi.string().min(5).required()
    };
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.referralValidation = referralValidation;