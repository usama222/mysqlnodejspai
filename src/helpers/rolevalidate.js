const Joi = require('joi');

const roleschema = Joi.when(Joi.ref("$method"), {

    "is": "PUT",
    "then": Joi.object().keys({
        role_id: Joi.number().required(),
        role_name: Joi.string().max(50).required(),
        is_active: Joi.number().min(1)
    }),
    "otherwise": Joi.object().keys({
        role_id: Joi.number().forbidden(),
        role_name: Joi.string().max(50).required(),
        is_active: Joi.number().min(1)
    })
});
module.exports = roleschema;