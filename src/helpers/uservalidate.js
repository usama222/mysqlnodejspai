const Joi = require("joi");

const userschema = Joi.when(Joi.ref("$method"), {
    "is": "PUT",
    "then": Joi.object().keys({
        user_id: Joi.number().required(),
        username: Joi.string().max(200).required(),
        password: Joi.forbidden(),
        role_id: Joi.number().required(),
        is_active: Joi.number().min(1).required()

    }),
    "otherwise": Joi.object().keys({
        username: Joi.string().max(200).required(),
        password: Joi.string().max(150).required(),
        role_id: Joi.number().required(),
    })
});

module.exports = userschema;